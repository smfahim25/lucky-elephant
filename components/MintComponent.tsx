/* eslint-disable react-hooks/rules-of-hooks */

import {
    CandyGuard,
    CandyMachine,
    mintV2,
  } from "@metaplex-foundation/mpl-candy-machine";
  import { GuardReturn } from "../utils/checkerHelper";
  import {
    AddressLookupTableInput,
    KeypairSigner,
    PublicKey,
    Transaction,
    Umi,
    createBigInt,
    generateSigner,
    none,
    publicKey,
    signAllTransactions,
    sol,
    some,
    transactionBuilder,
  } from "@metaplex-foundation/umi";
  import {
    DigitalAsset,
    DigitalAssetWithToken,
    JsonMetadata,
    fetchDigitalAsset,
    fetchJsonMetadata,
  } from "@metaplex-foundation/mpl-token-metadata";
  import { mintText } from "../settings";
  import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    SimpleGrid,
    Text,
    Tooltip,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    VStack,
    Divider,
    createStandaloneToast,
  } from "@chakra-ui/react";
  import {
    fetchAddressLookupTable,
    setComputeUnitLimit,
    transferSol,
  } from "@metaplex-foundation/mpl-toolbox";
  import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
  import {
    chooseGuardToUse,
    routeBuilder,
    mintArgsBuilder,
    GuardButtonList,
  } from "../utils/mintHelper";
  import { useSolanaTime } from "@/utils/SolanaTimeContext";
  import { verifyTx } from "@/utils/verifyTx";
  import { base58 } from "@metaplex-foundation/umi/serializers";
import { clusterApiUrl, Connection } from "@solana/web3.js";
  
  const updateLoadingText = (
    loadingText: string | undefined,
    guardList: GuardReturn[],
    label: string,
    setGuardList: Dispatch<SetStateAction<GuardReturn[]>>
  ) => {
    const guardIndex = guardList.findIndex((g) => g.label === label);
    if (guardIndex === -1) {
      console.error("guard not found");
      return;
    }
    const newGuardList = [...guardList];
    newGuardList[guardIndex].loadingText = loadingText;
    setGuardList(newGuardList);
  };
  
  const fetchNft = async (
    umi: Umi,
    nftAdress: PublicKey,
  ) => {
    let digitalAsset: DigitalAsset | undefined;
    let jsonMetadata: JsonMetadata | undefined;
    try {
      digitalAsset = await fetchDigitalAsset(umi, nftAdress);
      jsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri);
    } catch (e) {
      console.error(e);
      createStandaloneToast().toast({
        title: "Nft could not be fetched!",
        description: "Please check your Wallet instead.",
        status: "info",
        duration: 900,
        isClosable: true,
      });
    }
  
    return { digitalAsset, jsonMetadata };
  };
  
  const mintClick = async (
    umi: Umi,
    guard: GuardReturn,
    candyMachine: CandyMachine,
    candyGuard: CandyGuard,
    ownedTokens: DigitalAssetWithToken[],
    mintAmount: number,
    mintsCreated:
      | {
          mint: PublicKey;
          offChainMetadata: JsonMetadata | undefined;
        }[]
      | undefined,
    setMintsCreated: Dispatch<
      SetStateAction<
        | { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[]
        | undefined
      >
    >,
    guardList: GuardReturn[],
    setGuardList: Dispatch<SetStateAction<GuardReturn[]>>,
    onOpen: () => void,
    setCheckEligibility: Dispatch<SetStateAction<boolean>>
  ) => {
    const guardToUse = chooseGuardToUse(guard, candyGuard);
    if (!guardToUse.guards) {
      console.error("no guard defined!");
      return;
    }
  
    let buyBeer = true;
    if (!process.env.NEXT_PUBLIC_BUYASHARCOFFEE) {
      buyBeer = false;
      console.log("The Creator does not want to pay for Ashar's coffee 😒");
    }
  
    try {
      //find the guard by guardToUse.label and set minting to true
      const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
      if (guardIndex === -1) {
        console.error("guard not found");
        return;
      }
      const newGuardList = [...guardList];
      newGuardList[guardIndex].minting = true;
      setGuardList(newGuardList);
  
      let routeBuild = await routeBuilder(umi, guardToUse, candyMachine);
      if (routeBuild) {
        createStandaloneToast().toast({
          title: "Allowlist detected. Please sign to be approved to mint.",
          status: "info",
          duration: 900,
          isClosable: true,
        });
        await routeBuild.sendAndConfirm(umi, {
          confirm: { commitment: "processed" },
          send: {
            skipPreflight: true,
          },
        });
      }
  
      // fetch LUT
      let tables: AddressLookupTableInput[] = [];
      const lut = process.env.NEXT_PUBLIC_LUT;
      if (lut) {
        const lutPubKey = publicKey(lut);
        const fetchedLut = await fetchAddressLookupTable(umi, lutPubKey);
        tables = [fetchedLut];
      } else {
        createStandaloneToast().toast({
          title: "The developer should really set a lookup table!",
          status: "warning",
          duration: 900,
          isClosable: true,
        });
      }
  
      const mintTxs: Transaction[] = [];
      let nftsigners = [] as KeypairSigner[];
  
      const latestBlockhash = (await umi.rpc.getLatestBlockhash()).blockhash;
  
      for (let i = 0; i < mintAmount; i++) {
        const nftMint = generateSigner(umi);
        nftsigners.push(nftMint);
  
        const mintArgs = mintArgsBuilder(candyMachine, guardToUse, ownedTokens);
        let tx = transactionBuilder().add(
          mintV2(umi, {
            candyMachine: candyMachine.publicKey,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            nftMint,
            group:
              guardToUse.label === "default" ? none() : some(guardToUse.label),
            candyGuard: candyGuard.publicKey,
            mintArgs,
            tokenStandard: candyMachine.tokenStandard,
          }),
        );
  
        if (buyBeer) {
          tx = tx.prepend(
            transferSol(umi, {
              destination: publicKey(
                "B6NpJRGQrKbZxuUY6x8G4Y7mr4jo77ea4WvYc9mJmY2k"
              ),
              amount: sol(Number(0.005)),
            })
          );
        }
        tx = tx.prepend(setComputeUnitLimit(umi, { units: 800_000 }));
        tx = tx.setAddressLookupTables(tables);

        tx = tx.setBlockhash(latestBlockhash);


        const transaction = tx.build(umi);
        mintTxs.push(transaction);
      }
      if (!mintTxs.length) {
        console.error("no mint tx built!");
        return;
      }
  
      updateLoadingText(`Please sign`, guardList, guardToUse.label, setGuardList);
      const signedTransactions = await signAllTransactions(
        mintTxs.map((transaction, index) => ({
          transaction,
          signers: [umi.payer, nftsigners[index]],
        }))
      );
  
      let signatures: Uint8Array[] = [];
      let amountSent = 0;
      const sendPromises = signedTransactions.map(async (tx: Transaction, index: number) => {

        return umi.rpc
          .sendTransaction(tx, {
            skipPreflight: true // A hack to fix blockhash not found bugs.
          })
          .then((signature: any) => {
            console.log(
              `Transaction ${index + 1} resolved with signature: ${
                base58.deserialize(signature)[0]
              }`
            );
            amountSent = amountSent + 1;
            signatures.push(signature);
            return { status: "fulfilled", value: signature };
          })
          .catch((error) => {
            console.error(`Transaction ${index + 1} failed:`, error);
            return { status: "rejected", reason: error };
          });
      });
  
      await Promise.allSettled(sendPromises);
  
      if (!(await sendPromises[0]).status === true) {
        // throw error that no tx was created
        throw new Error("no tx was created");
      }
      updateLoadingText(
        `finalizing transaction(s)`,
        guardList,
        guardToUse.label,
        setGuardList
      );
  
      createStandaloneToast().toast({
        title: `${signedTransactions.length} Transaction(s) sent!`,
        status: "success",
        duration: 3000,
      });
      
      const successfulMints = await verifyTx(umi, signatures);
  
      updateLoadingText(
        "Fetching your NFT",
        guardList,
        guardToUse.label,
        setGuardList
      );
  
      // Filter out successful mints and map to fetch promises
      const fetchNftPromises = successfulMints.map((mintResult) =>
        fetchNft(umi, mintResult).then((nftData) => ({
          mint: mintResult,
          nftData,
        }))
      );
  
      const fetchedNftsResults = await Promise.all(fetchNftPromises);
  
      // Prepare data for setting mintsCreated
      let newMintsCreated: { mint: PublicKey; offChainMetadata: JsonMetadata }[] =
        [];
      fetchedNftsResults.map((acc) => {
        if (acc.nftData.digitalAsset && acc.nftData.jsonMetadata) {
          newMintsCreated.push({
            mint: acc.mint,
            offChainMetadata: acc.nftData.jsonMetadata,
          });
        }
        return acc;
      }, []);
  
      // Update mintsCreated only if there are new mints
      if (newMintsCreated.length > 0) {
          setMintsCreated(newMintsCreated);
          onOpen();
      }
    } catch (e) {
      console.error(`minting failed because of ${e}`);
      createStandaloneToast().toast({
        title: "Your mint failed!",
        description: "Please try again.",
        status: "error",
        duration: 900,
        isClosable: true,
      });
    } finally {
      //find the guard by guardToUse.label and set minting to true
      const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
      if (guardIndex === -1) {
        console.error("guard not found");
        return;
      }
      const newGuardList = [...guardList];
      newGuardList[guardIndex].minting = false;
      setGuardList(newGuardList);
      setCheckEligibility(true);
      updateLoadingText(undefined, guardList, guardToUse.label, setGuardList);
    }
  };
  // new component called timer that calculates the remaining Time based on the bigint solana time and the bigint toTime difference.
  const Timer = ({
    solanaTime,
    toTime,
    setCheckEligibility,
  }: {
    solanaTime: bigint;
    toTime: bigint;
    setCheckEligibility: Dispatch<SetStateAction<boolean>>;
  }) => {
    const [remainingTime, setRemainingTime] = useState<bigint>(
      toTime - solanaTime
    );
    useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          return prev - BigInt(1);
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    //convert the remaining time in seconds to the amount of days, hours, minutes and seconds left
    const days = remainingTime / BigInt(86400);
    const hours = (remainingTime % BigInt(86400)) / BigInt(3600);
    const minutes = (remainingTime % BigInt(3600)) / BigInt(60);
    const seconds = remainingTime % BigInt(60);
    if (seconds > BigInt(0) || minutes > BigInt(0)) {
      return (
        <>
        <div
                    className="tw-flex tw-gap-2">
                    <div className="tw-cursor-default"
                        data-state="closed">
                        <div
                            className="tw-w-8 tw-h-8 tw-cursor-default tw-bg-purple-3 tw-flex tw-items-center tw-justify-center tw-rounded tw-text-sm tw-font-bold tw-text-white-1 tw-font-mono">
                            <span>{days.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false})}</span></div>
                    </div>
                    <div className="tw-cursor-default"
                        data-state="closed">
                        <div
                            className="tw-w-8 tw-h-8 tw-cursor-default tw-bg-purple-3 tw-flex tw-items-center tw-justify-center tw-rounded tw-text-sm tw-font-bold tw-text-white-1 tw-font-mono">
                            <span>{hours.toLocaleString("en-US", {minimumIntegerDigits: 2,useGrouping: false})}</span></div>
                    </div>
                    <div className="tw-cursor-default"
                        data-state="closed">
                        <div
                            className="tw-w-8 tw-h-8 tw-cursor-default tw-bg-purple-3 tw-flex tw-items-center tw-justify-center tw-rounded tw-text-sm tw-font-bold tw-text-white-1 tw-font-mono">
                            <span>{minutes.toLocaleString("en-US", {minimumIntegerDigits: 2,useGrouping: false})}</span></div>
                    </div>
                    <div className="tw-cursor-default"
                        data-state="closed">
                        <div
                            className="tw-w-8 tw-h-8 tw-cursor-default tw-bg-purple-3 tw-flex tw-items-center tw-justify-center tw-rounded tw-text-sm tw-font-bold tw-text-white-1 tw-font-mono">
                            <span>{seconds.toLocaleString("en-US", {minimumIntegerDigits: 2,useGrouping: false})}</span></div>
                    </div>
        </div>
        </>
        
      );
    }
    return <Text></Text>;
  };
  
  type Props = {
    umi: Umi;
    guardList: GuardReturn[];
    candyMachine: CandyMachine | undefined;
    candyGuard: CandyGuard | undefined;
    ownedTokens: DigitalAssetWithToken[] | undefined;
    setGuardList: Dispatch<SetStateAction<GuardReturn[]>>;
    mintsCreated:
      | {
          mint: PublicKey;
          offChainMetadata: JsonMetadata | undefined;
        }[]
      | undefined;
    setMintsCreated: Dispatch<
      SetStateAction<
        | { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[]
        | undefined
      >
    >;
    onOpen: () => void;
    setCheckEligibility: Dispatch<SetStateAction<boolean>>;
    isConnected: boolean;
    solPrice: number
  };
  
  export function MyButtonList({
    umi,
    guardList,
    candyMachine,
    candyGuard,
    ownedTokens = [], // provide default empty array
    setGuardList,
    mintsCreated,
    setMintsCreated,
    onOpen,
    setCheckEligibility,
    isConnected,
    solPrice
  }: Props): JSX.Element {
    const solanaTime = useSolanaTime();
    const [numberInputValues, setNumberInputValues] = useState<{
      [label: string]: number;
    }>({});
    if (!candyMachine || !candyGuard) {
      return <></>;
    }


        // remove duplicates from guardList
    //fucked up bugfix
    let filteredGuardlist = guardList.filter(
        (elem, index, self) =>
          index === self.findIndex((t) => t.label === elem.label)
      );
      if (filteredGuardlist.length === 0) {
        return <></>;
      }
      // Guard "default" can only be used to mint in case no other guard exists
      if (filteredGuardlist.length > 1) {
        filteredGuardlist = guardList.filter((elem) => elem.label != "default");
      }
      let buttonGuardList: any[] = [];
      for (const guard of filteredGuardlist) {
        const text = mintText.find((elem) => elem.label === guard.label);
        // find guard by label in candyGuard
        const group = candyGuard.groups.find((elem) => elem.label === guard.label);
        let startTime = createBigInt(0);
        let endTime = createBigInt(0);
        let displayMintLimit = 0
        let solPayment = 0
  
        if (group) {
          if (group.guards.startDate.__option === "Some") {
            startTime = group.guards.startDate.value.date;
          }
          if (group.guards.endDate.__option === "Some") {
            endTime = group.guards.endDate.value.date;
          }
          if(group.guards.mintLimit.__option === 'Some') {
              displayMintLimit = group.guards.mintLimit.value.limit
          }
          if(group.guards.solPayment.__option === 'Some') {
              solPayment = Number(group.guards.solPayment.value.lamports.basisPoints) / 10**Number(group.guards.solPayment.value.lamports.decimals)
          }
        }
    
        let buttonElement: GuardButtonList = {
          label: guard ? guard.label : "default",
          allowed: guard.allowed,
          header: text ? text.header : "Public",
          mintText: text ? text.mintText : "mintText missing in settings.tsx",
          buttonLabel: text
            ? text.buttonLabel
            : "buttonLabel missing in settings.tsx",
          startTime,
          endTime,
          tooltip: guard.reason,
          maxAmount: guard.maxAmount,
          displayMintLimit,
          solPayment
        };
        buttonGuardList.push(buttonElement);
      }

    const [currentMint, setCurrentMint] = useState( localStorage.getItem('cm') || 'public')

    useEffect(() => {
      
      console.log(buttonGuardList, 'buttonGuardList', guardList);
      if(currentMint !== buttonGuardList[buttonGuardList.length - 1].label){
        return;
      }
      if(guardList && guardList.length){
        for (let i = 0; i < guardList.length; i++) {
            const g = guardList[i];
            if(g.allowed 
                // || g.reason === 'Mint limit of this wallet reached'
                ){
                localStorage.setItem('cm', g.label === 'default' ? 'public' : g.label)
                setCurrentMint(g.label === 'default' ? 'public' : g.label)
                return
            }
        }
        setCurrentMint(buttonGuardList[buttonGuardList.length - 1].label === 'default' ? 'public' : buttonGuardList[buttonGuardList.length - 1].label)
        localStorage.setItem(
            'cm', 
            buttonGuardList[buttonGuardList.length - 1].label === 'default' ? 'public' : buttonGuardList[buttonGuardList.length - 1].label
        )
    }
    }, [umi, guardList])

    const [displayAmount, setDisplayAmount] = useState<any>(localStorage.getItem('ad') || 0)

    useEffect(() => {
      for (let i = 0; i < buttonGuardList.length; i++) {
        const g = buttonGuardList[i];
        if(g && g.label === currentMint){
            setDisplayAmount(g.solPayment)
            localStorage.setItem('ad', g.solPayment)
        }
      }
    }, [buttonGuardList, currentMint])

    useEffect(() => {
        if(currentMint === 'default'){
            setCurrentMint(buttonGuardList[buttonGuardList.length - 1].label)
            localStorage.setItem('cm', buttonGuardList[buttonGuardList.length - 1].label)
        }
    }, [currentMint])
    
    

    useEffect(() => {
      console.log(currentMint, 'current');
    }, [currentMint])
    
    
  
    const handleNumberInputChange = (label: string, value: number) => {
      setNumberInputValues((prev) => ({ ...prev, [label]: value }));
    };
  



    const listItems = buttonGuardList.map((buttonGuard, index) => (
<>

<div className="tw-cursor-default" data-state="closed">
    <div onClick={()=>{ if(buttonGuard.allowed) {setCurrentMint(buttonGuard.label); localStorage.setItem('cm', buttonGuard.label)}}} style={{ cursor: buttonGuard.allowed ? 'pointer' : '' }}
        className={`${ currentMint === buttonGuard.label ? 'selected-group' : '' } ${buttonGuard.allowed ? 'allowed-group' : ''} csax tw-rounded-xl tw-border tw-border-solid tw-border-purple-1 tw-p-3 tw-flex tw-flex-col tw-gap-6 hover:tw-bg-purple-1 hover:tw-cursor-default`}>
        <div
            className="tw-flex tw-justify-between tw-items-center">
            <div>
                <div
                    className="tw-flex tw-items-center">
                    <div
                        className="tw-border tw-rounded-full tw-py-0.5 tw-px-2 tw-text-[12px] tw-h-fit tw-bg-purple-3 tw-text-white-1">
                        {buttonGuard.header}</div>
                </div>
            </div>

            
          { !isConnected ? '' :
          (buttonGuard.endTime > createBigInt(0) &&
            buttonGuard.endTime - solanaTime > createBigInt(0) &&
            (!buttonGuard.startTime ||
              buttonGuard.startTime - solanaTime <= createBigInt(0))) ? (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Text marginRight={"2"} className="tw-text-light-gray-200">
                  ENDS IN{" "}
                </Text>
                <Timer
                  toTime={buttonGuard.endTime}
                  solanaTime={solanaTime}
                  setCheckEligibility={setCheckEligibility}
                />
              </div>
            ) : (buttonGuard.startTime > createBigInt(0) &&
            buttonGuard.startTime - solanaTime > createBigInt(0) &&
            (!buttonGuard.endTime ||
              solanaTime - buttonGuard.endTime <= createBigInt(0))) ? (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Text marginRight={"2"} className="tw-text-light-gray-200">
                  STARTS IN{" "}
                </Text>
                <Timer
                  toTime={buttonGuard.startTime}
                  solanaTime={solanaTime}
                  setCheckEligibility={setCheckEligibility}
                />
              </div>
            ) : <Text className="tw-text-light-gray-200">{buttonGuard.allowed ? 'Mint is Live' : buttonGuard.tooltip }</Text> }
                    
        </div>
        <div
            className="tw-flex tw-items-center tw-gap-1.5 tw-text-white-1 tw-tracking-wide tw-text-sm">
            <span>MAX <b>{buttonGuard.displayMintLimit} TOKENS</b></span><b>•</b>
            <div className="tw-inline-block"
                data-state="closed">Price {buttonGuard.solPayment}<b>◎</b></div>
        </div>
    </div>
                </div>
</>
    ));

    const showButton = buttonGuardList.map((buttonGuard, index) => (
        <>        
              <Box key={index} style={{ display: currentMint === buttonGuard.label ? 'block' : 'none' }} >
                  <VStack>
                    {/* <>
                    {process.env.NEXT_PUBLIC_MULTIMINT && buttonGuard.allowed ? (
                      <NumberInput
                        value={numberInputValues[buttonGuard.label] || 1}
                        min={1}
                        max={buttonGuard.maxAmount < 1 ? 1 : buttonGuard.maxAmount}
                        size="sm"
                        isDisabled={!buttonGuard.allowed}
                        onChange={(valueAsString, valueAsNumber) =>
                          handleNumberInputChange(buttonGuard.label, valueAsNumber)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    ) : null}
                    </> */}
          
                    <Tooltip label={buttonGuard.tooltip} aria-label="Mint button">
                      <Button
                        className="tw-inline-flex dsca tw-justify-center tw-items-center tw-rounded tw-text-sm tw-text-white-1 tw-py-0 tw-px-3 hover:tw-opacity-80 tw-transition tw-duration-300 tw-ease-in-out tw-bg-pink-primary tw-grow tw-h-[44px]"
                        onClick={() =>
                          mintClick(
                            umi,
                            buttonGuard,
                            candyMachine,
                            candyGuard,
                            ownedTokens,
                            numberInputValues[buttonGuard.label] || 1,
                            mintsCreated,
                            setMintsCreated,
                            guardList,
                            setGuardList,
                            onOpen,
                            setCheckEligibility
                          )
                        }
                        key={buttonGuard.label}
                        backgroundColor="#e42575"
                        size="md"
                        style={{width: '100%', padding: '22px'}}
                        isDisabled={!buttonGuard.allowed}
                        isLoading={
                          guardList.find((elem) => elem.label === buttonGuard.label)
                            ?.minting
                        }
                        loadingText={
                          guardList.find((elem) => elem.label === buttonGuard.label)
                            ?.loadingText
                        }
                      >
                        {buttonGuard.buttonLabel}
                      </Button>
                    </Tooltip>
                  </VStack>
              </Box>
        </>
            ));
  
    return <>
    
    {listItems}

    <>
    <div className="tw-pt-4 empty:tw-py-0 tw-border-t empty:tw-border-t-0">
                                                        <div className="tw-flex tw-flex-col tw-gap-y-4">
                                                            <div className="tw-flex tw-flex-col tw-gap-5 tw-p-4 tw-rounded-lg tw-bg-purple-2">
                                                                <div className="tw-flex tw-gap-6 tw-text-[13px]">
                                                                    <div>
                                                                        <div
                                                                            className="tw-px-3 tw-bg-light-gray-500 tw-bg-opacity-10 tw-rounded tw-text-sm tw-whitespace-nowrap tw-min-w-[42px] tw-min-h-[40px] tw-py-2.5">
                                                                            <div className="tw-flex tw-items-center tw-gap-x-2"><span
                                                                                    className="tw-flex-shrink-0 tw-h-2 tw-w-2 tw-relative tw-flex tw-items-center tw-justify-center"
                                                                                    aria-hidden="true"><span
                                                                                        className="tw-absolute tw-h-2.5 tw-w-2.5 tw-rounded-full tw-bg-green-2 tw-animate-ping [animation-duration:2s]"></span><span
                                                                                        className="tw-relative tw-block tw-w-2 tw-h-2 tw-bg-green-1 tw-rounded-full"></span></span><span
                                                                                    className="tw-capitalize tw-text-green-1">live</span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tw-w-full tw-mt-1">
                                                                        <div className="tw-flex tw-flex-col tw-gap-1 tw-grow">
                                                                            <div className="tw-flex tw-items-center tw-justify-between tw-gap-x-5 tw-text-sm tw-text-gray-5">
                                                                                <span className="max-md:tw-hidden">Total Minted</span>
                                                                                <div className="tw-flex tw-gap-x-1 max-md:tw-w-full md:tw-items-center">
                                                                                    <p className="tw-text-white-1 tw-font-bold max-md:tw-mr-auto">
                                                                                    {(Number(candyMachine?.itemsRedeemed) * 100/Number(candyMachine?.data.itemsAvailable)).toFixed(0)}
                                                                                      %</p>
                                                                                    <div className="max-md:tw-ml-auto" data-state="closed">
                                                                                        <p className="" style={{ textDecorationStyle: 'dotted' }}>
                                                                                        ({Number(candyMachine?.itemsRedeemed) }/{Number(candyMachine?.data.itemsAvailable)})</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="progress-bar__container">
                                                                                <div className="progress-bar__value" style={{ width: 
                                                                                (Number(candyMachine?.itemsRedeemed)  * 100 /Number(candyMachine?.data.itemsAvailable)).toFixed(3) + '%'
                                                                                }}></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tw-flex">
                                                                    <div>
                                                                        <p className="tw-text-gray-5 tw-text-xs md:tw-text-sm tw-font-600">Price</p>
                                                                        <p><span className="tw-text-md md:tw-text-[24px] tw-font-bold">{displayAmount} SOL</span><span
                                                                                className="tw-text-xs md:tw-text-sm tw-text-light-gray-400 tw-ml-1 md:tw-ml-2">(${ Number(Number(Number(displayAmount) * Number(solPrice)).toFixed(2)) })</span>
                                                                        </p>
                                                                        <div className="tw-text-xs md:tw-text-sm tw-flex tw-items-center tw-gap-x-1 tw-text-light-gray-400">
                                                                            <span>+0.008 SOL mint fee </span>
                                                                            <div className="tw-cursor-default" data-state="closed"><svg stroke="currentColor" fill="none"
                                                                                    stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                                                                                    color="#998CA6" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
                                                                                    style={{ color: 'rgb(153, 140, 166)' }}>
                                                                                    <circle cx="12" cy="12" r="10"></circle>
                                                                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                                                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                                                </svg></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <>{showButton}</>
                                                                
                                                                {/* <div className="tw-flex tw-items-center tw-gap-3 tw-self-start">
                                                                  <span className="tw-text-xs md:tw-text-sm tw-text-white-2">
                                                                    {'OG'} wallet detected!</span></div> */}
                                                            </div>
                                                        </div>
    </div>
    </>

    </>;
  }
  