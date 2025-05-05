"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ToastContainer, toast } from "react-toastify";
import { useUmi } from "@/utils/useUmi";

import "react-toastify/dist/ReactToastify.css";

import ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import "./style.css";

import {
  initializeHelper,
  buildCandyGuardMintTx,
} from "@/src/utils/alchemyHelper";

import CountDown from "@/src/common/countDown";
import Button from "@/src/common/button";
import Particle from "./Particles";
import MintStyleWrapper from "./Mint.style";

import thumb1 from "@/src/assets/images/nft/v4-2dslider-img.png";
import thumb2 from "@/src/assets/images/nft/v4-2dslider-img2.png";
import thumb3 from "@/src/assets/images/nft/v4-2dslider-img3.png";
import checkIcon from "@/src/assets/images/icon/elly_foot_print.svg";
import discordIcon from "@/src/assets/images/icon/dis_logo.svg";
import twitterIcon from "@/src/assets/images/icon/Twitter.svg";

import { Box, Tooltip, VStack } from "@chakra-ui/react";
import Confetti from "react-confetti"; // For a WOW factor confetti animation

import {
  AddressLookupTableInput,
  KeypairSigner,
  PublicKey,
  Transaction as umiTransaction,
  Umi,
  createBigInt,
  none,
  publicKey as umiPublicKey,
  signAllTransactions,
  some,
  generateSigner,
  transactionBuilder,
} from "@metaplex-foundation/umi";

import {
  DigitalAsset,
  DigitalAssetWithToken,
  fetchDigitalAsset,
  fetchJsonMetadata,
  JsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  fetchCandyMachine,
  safeFetchCandyGuard,
  CandyGuard,
  CandyMachine,
  AccountVersion,
  mintV2,
} from "@metaplex-foundation/mpl-candy-machine";

import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js";
import { base58 } from "@metaplex-foundation/umi/serializers";

import { verifyTx } from "@/utils/verifyTx";
import { guardChecker } from "@/utils/checkAllowed";
import { GuardReturn } from "@/utils/checkerHelper";
import {
  chooseGuardToUse,
  GuardButtonList,
  mintArgsBuilder,
  routeBuilder,
} from "@/utils/mintHelper";
import {
  fetchAddressLookupTable,
  setComputeUnitLimit,
} from "@metaplex-foundation/mpl-toolbox";

import ModalSolana from "./ModalSolana";
import { useSolanaTime } from "@/utils/SolanaTimeContext";

// Devnet Candy Machine + Candy Guard
const DEVNET_CANDY_MACHINE_ID =
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || "Ckhcc5kwS88k...";
const DEVNET_CANDY_GUARD_ID = "9kct6p92dbBSosR4vhwLWV9u7wZfJRxdmvMWA54zyykS";

// For multi-step progress
type MintFlowStep = "idle" | "building" | "signing" | "sending" | "confirming" | "verifying" | "done";

const mintText = [
  {
    label: "OG",
    mintText: "OG mints are frew",
    buttonLabel: "Mint as OG!",
    header: "OG Mint",
  },
  {
    label: "WL",
    mintText: "Minting for VIP",
    buttonLabel: "Mint as Whitelisted!",
    header: "WL Mint",
  },
  {
    label: "public",
    mintText: "Mint now!",
    buttonLabel: "Mint now!",
    header: "Public Mint",
  },
];

/**
 * Hook to fetch CandyMachine & CandyGuard on mount
 */
const useCandyMachine = (
  umi: Umi,
  candyMachineId: string,
  checkEligibility: boolean,
  setCheckEligibility: Dispatch<SetStateAction<boolean>>,
  firstRun: boolean,
  setFirstRun: Dispatch<SetStateAction<boolean>>
) => {
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [candyGuard, setCandyGuard] = useState<CandyGuard>();

  useEffect(() => {
    (async () => {
      if (!checkEligibility) return;

      if (!candyMachineId) {
        console.error("No candy machine in .env!");
        console.warn({
          id: "no-cm",
          title: "No candy machine in .env!",
          description: "Add your candy machine address to the .env file!",
          status: "error",
          duration: 999999,
          isClosable: true,
        });
        return;
      }

      let fetchedCandyMachine: CandyMachine | undefined;
      try {
        fetchedCandyMachine = await fetchCandyMachine(umi, umiPublicKey(candyMachineId));
        // Verify CM Version
        if (fetchedCandyMachine.version !== AccountVersion.V2) {
          console.warn({
            id: "wrong-account-version",
            title: "Wrong candy machine account version!",
            description:
              "Please use the latest sugar to create your candy machine. Need Account Version 2!",
            status: "error",
            duration: 999999,
            isClosable: true,
          });
          return;
        }
      } catch (e) {
        console.error(e);
        console.warn({
          id: "no-cm-found",
          title: "The CM from .env is invalid",
          description: "Are you using the correct environment?",
          status: "error",
          duration: 999999,
          isClosable: true,
        });
      }

      setCandyMachine(fetchedCandyMachine);
      if (!fetchedCandyMachine) return;

      let fetchedCandyGuard: CandyGuard | undefined;
      try {
        fetchedCandyGuard = await safeFetchCandyGuard(umi, fetchedCandyMachine.mintAuthority);
      } catch (e) {
        console.error(e);
        console.warn({
          id: "no-guard-found",
          title: "No Candy Guard found!",
          description: "Do you have one assigned?",
          status: "error",
          duration: 999999,
          isClosable: true,
        });
      }
      if (!fetchedCandyGuard) return;

      setCandyGuard(fetchedCandyGuard);
      if (firstRun) setFirstRun(false);
    })();
  }, [umi, candyMachineId, checkEligibility, firstRun, setFirstRun]);

  return { candyMachine, candyGuard };
};

/**
 * Build & Send Mint Transactions
 * Now we insert small steps to update the multi-step progress.
 */
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
    SetStateAction<{ mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[] | undefined>
  >,
  guardList: GuardReturn[],
  setGuardList: Dispatch<SetStateAction<GuardReturn[]>>,
  onOpen: () => void,
  setCheckEligibility: Dispatch<SetStateAction<boolean>>,
  setWritePending: (pending: boolean) => void,
  setMintFlowStep: (step: MintFlowStep) => void // Add new param for the step
) => {
  const guardToUse = chooseGuardToUse(guard, candyGuard);
  if (!guardToUse.guards) {
    console.error("No guard defined for this label!");
    return;
  }

  try {
    // Mark guard as "minting"
    const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
    if (guardIndex === -1) {
      console.error("Guard not found");
      return;
    }
    const newGuardList = [...guardList];
    newGuardList[guardIndex].minting = true;
    setGuardList(newGuardList);

    setWritePending(true);

    // Step 1: "building"
    setMintFlowStep("building");
    const routeBuild = await routeBuilder(umi, guardToUse, candyMachine);

    // Step 2: "signing" (some route instructions might need sign)
    setMintFlowStep("signing");
    if (routeBuild) {
      toast.info("Allowlist detected. Please sign to be approved to mint.");
      await routeBuild.sendAndConfirm(umi, {
        confirm: { commitment: "processed" },
        send: { skipPreflight: true },
      });
    }

    // Step 3: "sending"
    setMintFlowStep("sending");
    // (Optional) Fetch LUT
    let tables: AddressLookupTableInput[] = [];
    const lut = process.env.NEXT_PUBLIC_LUT;
    if (lut) {
      const lutPubKey = umiPublicKey(lut);
      const fetchedLut = await fetchAddressLookupTable(umi, lutPubKey);
      tables = [fetchedLut];
    }

    const mintTxs: Transaction[] = [];
    const nftSigners: KeypairSigner[] = [];
    const latestBlockhash = (await umi.rpc.getLatestBlockhash()).blockhash;

    for (let i = 0; i < mintAmount; i++) {
      const nftMint = generateSigner(umi);
      nftSigners.push(nftMint);

      const mintArgs = mintArgsBuilder(candyMachine, guardToUse, ownedTokens);
      let tx = transactionBuilder().add(
        mintV2(umi, {
          candyMachine: candyMachine.publicKey,
          collectionMint: candyMachine.collectionMint,
          collectionUpdateAuthority: candyMachine.authority,
          nftMint,
          group: guardToUse.label === "default" ? none() : some(guardToUse.label),
          candyGuard: candyGuard.publicKey,
          mintArgs,
          tokenStandard: candyMachine.tokenStandard,
        })
      );

      tx = tx.prepend(setComputeUnitLimit(umi, { units: 800_000 }));
      tx = tx.setAddressLookupTables(tables);
      tx = tx.setBlockhash(latestBlockhash);

      const builtTx = tx.build(umi);
      mintTxs.push(builtTx as Transaction);
    }

    if (!mintTxs.length) {
      console.error("No mint tx built!");
      setWritePending(false);
      return;
    }

    const signedTransactions = await signAllTransactions(
      mintTxs.map((transaction, index) => ({
        transaction,
        signers: [umi.payer, nftSigners[index]],
      }))
    );

    // Step 4: "confirming"
    setMintFlowStep("confirming");
    const signatures: Uint8Array[] = [];
    const sendPromises = signedTransactions.map(async (tx: Transaction, index: number) => {
      return umi.rpc
        .sendTransaction(tx, {
          skipPreflight: true,
        })
        .then((signature: any) => {
          console.log(
            `Transaction ${index + 1} resolved with signature: ${base58.deserialize(signature)[0]}`
          );
          signatures.push(signature);
          return { status: "fulfilled", value: signature };
        })
        .catch((error) => {
          setWritePending(false);
          console.error(`Transaction ${index + 1} failed:`, error);
          return { status: "rejected", reason: error };
        });
    });

    await Promise.allSettled(sendPromises);

    if (!(await sendPromises[0]).status === true) {
      throw new Error("No transaction was successfully created");
    }

    toast.success(`${signedTransactions.length} Transaction(s) sent!`, { autoClose: 1000 });

    // Step 5: "verifying"
    setMintFlowStep("verifying");
    const successfulMints = await verifyTx(umi, signatures);

    const fetchNftPromises = successfulMints.map((mintResult) =>
      fetchNft(umi, mintResult).then((nftData) => ({
        mint: mintResult,
        nftData,
      }))
    );
    const fetchedNftsResults = await Promise.all(fetchNftPromises);

    setWritePending(false);

    // Prepare final minted data
    const newMintsCreated: { mint: PublicKey; offChainMetadata: JsonMetadata }[] = [];
    fetchedNftsResults.forEach((res) => {
      if (res.nftData.digitalAsset && res.nftData.jsonMetadata) {
        newMintsCreated.push({
          mint: res.mint,
          offChainMetadata: res.nftData.jsonMetadata,
        });
      }
    });

    console.log(newMintsCreated, " newMintsCreated");

    if (newMintsCreated.length > 0) {
      toast.success(`Minted x${mintAmount} NFT(s)!`, { autoClose: 3000 });
      setMintsCreated(newMintsCreated);
      // Step 6: "done"
      setMintFlowStep("done");
      onOpen();
    }
  } catch (e) {
    console.error(`Minting failed: ${e}`);
    toast.error("Your mint failed!");
    setMintFlowStep("idle");
    setWritePending(false);
  } finally {
    // Reset guard state
    const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
    if (guardIndex !== -1) {
      const newGuardList = [...guardList];
      newGuardList[guardIndex].minting = false;
      setGuardList(newGuardList);
    }
    setCheckEligibility(true);
    setWritePending(false);
  }
};

/**
 * Main Mint Component
 */
export default function SolMint2D() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const [count, setCount] = useState(1);
  const [maxSupply, setMaxSupply] = useState(0);
  const [mintedNfts, setMintedNfts] = useState(0);
  const [maxMint] = useState(10);
  const [writePending, setWritePending] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [whitelistEndDate, setWhitelistEndDate] = useState(new Date("2025-12-02T00:00:00Z"));
  const [checkEligibility, setCheckEligibility] = useState<boolean>(true);
  const [firstRun, setFirstRun] = useState(true);
  const [mintsCreated, setMintsCreated] = useState<
    { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[] | undefined
  >();
  const [ownedTokens, setOwnedTokens] = useState<DigitalAssetWithToken[]>();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [guards, setGuards] = useState<GuardReturn[]>([
    { label: "default", allowed: false, maxAmount: 0 },
  ]);

  // NEW: Multi-step mint flow state
  const [mintFlowStep, setMintFlowStep] = useState<MintFlowStep>("idle");

  const solanaTime = useSolanaTime();
  const umi = useUmi();

  // Load Candy Machine & Guard
  const { candyMachine: myCandyMachine, candyGuard: myCandyGuard } = useCandyMachine(
    umi,
    DEVNET_CANDY_MACHINE_ID,
    checkEligibility,
    setCheckEligibility,
    firstRun,
    setFirstRun
  );

  // Debug
  useEffect(() => {
    console.log("Public Key:", publicKey?.toBase58());
  }, [publicKey]);

  // Initialize
  useEffect(() => {
    initializeHelper();
  }, []);

  // Set max supply & minted count
  useEffect(() => {
    if (myCandyMachine && myCandyMachine.data) {
      setMaxSupply(Number(myCandyMachine.data.itemsAvailable));
      setMintedNfts(Number(myCandyMachine.itemsRedeemed));
    }
  }, [myCandyMachine]);

  // Example: read an end date from a guard group
  useEffect(() => {
    if (myCandyGuard && myCandyGuard.groups && myCandyGuard.groups[2]) {
      const num = Number((myCandyGuard as any).groups[2].guards.endDate.value.date);
      const datePublic = new Date(num * 1000).toISOString();
      setWhitelistEndDate(datePublic);
    }
  }, [myCandyGuard]);

  // Fallback mint (simple CandyGuard tx builder)
  const mintHandler = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect a Solana wallet!");
      return;
    }
    if (mintedNfts + count > maxSupply) {
      toast.error("Minting that many would exceed supply!");
      return;
    }

    setWritePending(true);
    try {
      // Show a step "building" if you want, or just do minimal
      setMintFlowStep("building");

      const tx = await buildCandyGuardMintTx({
        count,
        userPublicKeyStr: publicKey.toString(),
        candyMachineId: DEVNET_CANDY_MACHINE_ID,
        candyGuardId: DEVNET_CANDY_GUARD_ID,
        groupLabel: "public",
      });

      setMintFlowStep("signing");

      const solanaConnection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const txSig = await sendTransaction(tx, solanaConnection);

      setMintFlowStep("confirming");
      await solanaConnection.confirmTransaction(txSig, "confirmed");

      setMintedNfts((prev) => prev + count);

      setMintFlowStep("done");
      toast.success(`Minted x${count} NFT(s)!`);
    } catch (err) {
      console.error("Mint error:", err);
      toast.error(`Mint error: ${err.message}`);
      setMintFlowStep("idle");
    } finally {
      setWritePending(false);
    }
  };

  // On-chain fetch of minted NFT metadata
  const fetchNft = async (umi: Umi, nftAdress: PublicKey) => {
    let digitalAsset: DigitalAsset | undefined;
    let jsonMetadata: JsonMetadata | undefined;
    try {
      digitalAsset = await fetchDigitalAsset(umi, nftAdress);
      jsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri);
    } catch (e) {
      console.error(e);
      console.error({
        title: "Nft could not be fetched!",
        description: "Please check your Wallet instead.",
        status: "info",
        duration: 900,
        isClosable: true,
      });
    }
    return { digitalAsset, jsonMetadata };
  };

  // Check guard eligibility
  useEffect(() => {
    const checkEligibilityFunc = async () => {
      if (!myCandyMachine || !myCandyGuard || !checkEligibility) return;
      setFirstRun(false);

      const { guardReturn, ownedTokens } = await guardChecker(
        umi,
        myCandyGuard,
        myCandyMachine,
        solanaTime
      );
      setOwnedTokens(ownedTokens);
      setGuards(guardReturn);

      let allowed = false;
      for (const guard of guardReturn) {
        if (guard.allowed) {
          allowed = true;
          break;
        }
      }
      setIsAllowed(allowed);
    };
    checkEligibilityFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umi, checkEligibility, firstRun]);

  return (
    <MintStyleWrapper>
      <Particle />


      {/* Multi-step progress overlay or modal */}
      <MintFlowOverlay 
        step={mintFlowStep} 
        setMintFlowStep={setMintFlowStep}
      />

      <div className="container">
        {/* If CandyGuard & CandyMachine exist, show the main UI */}
        <div>
          {myCandyGuard && myCandyMachine ? (
            <MyButtonList
              guardList={guards}
              candyMachine={myCandyMachine}
              candyGuard={myCandyGuard}
              umi={umi}
              ownedTokens={ownedTokens}
              setGuardList={setGuards}
              mintsCreated={mintsCreated}
              setMintsCreated={setMintsCreated}
              onOpen={() => setIsOpen(true)}
              setCheckEligibility={setCheckEligibility}
              isConnected={connected}
              solPrice={0} // Will be overridden by guard-based price
              setWritePending={setWritePending}
              mintFlowStep={mintFlowStep}
              setMintFlowStep={setMintFlowStep}
            />
          ) : (
            ""
          )}
        </div>

        {/* Modal to display minted NFTs */}
        {mintsCreated && mintsCreated.length ? (
          <ModalSolana
            nft={mintsCreated[mintsCreated.length - 1].offChainMetadata}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
          />
        ) : null}
      </div>
    </MintStyleWrapper>
  );
}

/**
 * A full-screen overlay that shows multi-step progress.
 * It displays different animations for each step.
 * Now includes a "Close" button for the 'done' step.
 */
function MintFlowOverlay({
  step,
  setMintFlowStep, // <-- Make sure to pass this from the parent
}: {
  step: MintFlowStep;
  setMintFlowStep: (step: MintFlowStep) => void;
}) {
  if (step === "idle") return null;

  // Show confetti if step is 'done'
  const showConfetti = step === "done";

  // Map each step to its corresponding animation using public folder paths
  const animationMap: Record<MintFlowStep, JSX.Element> = {
    idle: <></>,
    building: (
      <img
        src="/animations/building.gif"
        alt="Building Transaction"
        style={{ width: "80px", height: "80px" }}
      />
    ),
    signing: (
      <img
        src="/animations/signing.gif"
        alt="Signing Transaction"
        style={{ width: "80px", height: "80px" }}
      />
    ),
    sending: (
      <img
        src="/animations/sending.gif"
        alt="Sending Transaction"
        style={{ width: "80px", height: "80px" }}
      />
    ),
    confirming: (
      <img
        src="/animations/confirming.gif"
        alt="Confirming Transaction"
        style={{ width: "80px", height: "80px" }}
      />
    ),
    verifying: (
      <img
        src="/animations/verifying.gif"
        alt="Verifying NFT"
        style={{ width: "80px", height: "80px" }}
      />
    ),
    done: (
      <>
        <img
          src="/animations/done.png"
          alt="Mint Successful"
          style={{ width: "250px", height: "250px" }}
        />
      </>
    ),
  };

  // Simple text mapping for steps
  const stepMap: Record<MintFlowStep, string> = {
    idle: "",
    building: "Building transaction...",
    signing: "Please sign the transaction in your wallet...",
    sending: "Sending transaction to the network...",
    confirming: "Confirming on-chain...",
    verifying: "Verifying minted NFT data...",
    done: "Mint Successful!",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        backgroundColor: "rgba(0,0,0,0.3)",
        transition: "opacity 0.3s ease",
      }}
    >
      {/* If you want confetti only on "done" */}
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 0}
          height={typeof window !== "undefined" ? window.innerHeight : 0}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div
        style={{
          pointerEvents: "auto",
          background: "#222",
          padding: "30px 40px",
          borderRadius: "8px",
          color: "#fff",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>{stepMap[step]}</h3>

        <div
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {animationMap[step]}
        </div>

        {/* If step === "done", show a close button */}
        {step === "done" && (
          <button
            onClick={() => setMintFlowStep("idle")} // Reset to idle to hide overlay
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "#e42575",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}



/**
 * Helper to update loading text on a specific guard
 */
const updateLoadingText = (
  loadingText: string | undefined,
  guardList: GuardReturn[],
  label: string,
  setGuardList: Dispatch<SetStateAction<GuardReturn[]>>
) => {
  const guardIndex = guardList.findIndex((g) => g.label === label);
  if (guardIndex === -1) {
    console.error("Guard not found");
    return;
  }
  const newGuardList = [...guardList];
  newGuardList[guardIndex].loadingText = loadingText;
  setGuardList(newGuardList);
};

/**
 * Fetch NFT metadata (used in the mintClick flow)
 */
const fetchNft = async (umi: Umi, nftAdress: PublicKey) => {
  let digitalAsset: DigitalAsset | undefined;
  let jsonMetadata: JsonMetadata | undefined;
  try {
    digitalAsset = await fetchDigitalAsset(umi, nftAdress);
    jsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri);
  } catch (e) {
    console.error(e);
    toast.error("Nft could not be fetched!");
    console.log({
      title: "Nft could not be fetched!",
      description: "Please check your Wallet instead.",
      status: "info",
      duration: 900,
      isClosable: true,
    });
  }
  return { digitalAsset, jsonMetadata };
};

/**
 * Props for the MyButtonList component
 */
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
    SetStateAction<{ mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[] | undefined>
  >;
  onOpen: () => void;
  setCheckEligibility: Dispatch<SetStateAction<boolean>>;
  isConnected: boolean;
  solPrice: number;
  setWritePending: (pending: boolean) => void;
  // new props for multi-step flow
  mintFlowStep: MintFlowStep;
  setMintFlowStep: (step: MintFlowStep) => void;
};

/**
 * Renders guard buttons, slider, and mint info
 */
function MyButtonList({
  umi,
  guardList,
  candyMachine,
  candyGuard,
  ownedTokens = [],
  setGuardList,
  mintsCreated,
  setMintsCreated,
  onOpen,
  setCheckEligibility,
  isConnected,
  solPrice,
  setWritePending,
  mintFlowStep,
  setMintFlowStep,
}: Props): JSX.Element {
  const [currentMint, setCurrentMint] = useState("public");
  const [displayAmount, setDisplayAmount] = useState<number>(0);
  const [writePendingLocal, setWritePendingLocal] = useState(false);
  const { connected } = useWallet();
  const solanaTime = useSolanaTime();

  // States for minted / supply, user count
  const [maxSupply, setMaxSupply] = useState(777);
  const [mintedNfts, setMintedNfts] = useState(0);
  const [maxMint, setMaxMint] = useState(5);
  const [count, setCount] = useState(1);
  const [priceSol, setPriceSol] = useState(0.1);

  // For approximate USD
  const [solUsdPrice, setSolUsdPrice] = useState<number>(0);
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await res.json();
        setSolUsdPrice(data.solana.usd);
      } catch (err) {
        console.error("Failed to fetch SOL price from CoinGecko", err);
      }
    };
    fetchSolPrice();
  }, []);
  const singlePriceUsd = (priceSol * solUsdPrice).toFixed(2);
  const totalPriceUsd = (priceSol * count * solUsdPrice).toFixed(2);

  // Keep guardList unique
  let filteredGuardlist = guardList.filter(
    (elem, index, self) => index === self.findIndex((t) => t.label === elem.label)
  );
  if (filteredGuardlist.length === 0) return <></>;
  if (filteredGuardlist.length > 1) {
    filteredGuardlist = guardList.filter((elem) => elem.label !== "default");
  }

  // Build the guard-based UI
  const buttonGuardList: GuardButtonList[] = [];
  for (const guard of filteredGuardlist) {
    const text = mintText.find((elem) => elem.label === guard.label);
    const group = candyGuard?.groups.find((elem) => elem.label === guard.label);
    let startTime = createBigInt(0);
    let endTime = createBigInt(0);
    let displayMintLimit = 0;
    let solPayment = 0;

    if (group) {
      if (group.guards.startDate.__option === "Some") {
        startTime = group.guards.startDate.value.date;
      }
      if (group.guards.endDate.__option === "Some") {
        endTime = group.guards.endDate.value.date;
      }
      if (group.guards.mintLimit.__option === "Some") {
        displayMintLimit = group.guards.mintLimit.value.limit;
      }
      if (group.guards.solPayment.__option === "Some") {
        solPayment =
          Number(group.guards.solPayment.value.lamports.basisPoints) /
          10 ** Number(group.guards.solPayment.value.lamports.decimals);
      }
    }

    buttonGuardList.push({
      label: guard ? guard.label : "default",
      allowed: guard.allowed,
      header: text ? text.header : "Public",
      mintText: text ? text.mintText : "mintText missing in settings.tsx",
      buttonLabel: text ? text.buttonLabel : "buttonLabel missing in settings.tsx",
      startTime,
      endTime,
      tooltip: guard.reason,
      maxAmount: guard.maxAmount,
      displayMintLimit,
      solPayment,
    });
  }

  // Set currentMint if allowed
  useEffect(() => {
    if (currentMint !== buttonGuardList[buttonGuardList.length - 1].label) return;
    if (guardList && guardList.length) {
      for (let i = 0; i < guardList.length; i++) {
        const g = guardList[i];
        if (g.allowed) {
          setCurrentMint(g.label === "default" ? "public" : g.label);
          return;
        }
      }
      setCurrentMint(
        buttonGuardList[buttonGuardList.length - 1].label === "default"
          ? "public"
          : buttonGuardList[buttonGuardList.length - 1].label
      );
    }
  }, [umi, guardList]);

  // Update display amount based on current guard
  useEffect(() => {
    for (let i = 0; i < buttonGuardList.length; i++) {
      const g = buttonGuardList[i];
      if (g && g.label === currentMint) {
        setDisplayAmount(g.solPayment);
      }
    }
  }, [buttonGuardList, currentMint]);

  // Avoid 'default' if there's a better label
  useEffect(() => {
    if (currentMint === "default") {
      setCurrentMint(buttonGuardList[buttonGuardList.length - 1].label);
    }
  }, [currentMint]);

  // Debug
  useEffect(() => {
    console.log("Current mint label:", currentMint);
  }, [currentMint]);

  // Sync local maxSupply & mintedNfts from candyMachine
  useEffect(() => {
    if (candyMachine && candyMachine.data) {
      setMaxSupply(Number(candyMachine.data.itemsAvailable));
      setMintedNfts(Number(candyMachine.itemsRedeemed));
    }
  }, [candyMachine]);

  // If a guard is allowed, set priceSol & maxMint from that guard
  useEffect(() => {
    if (buttonGuardList.length) {
      for (let i = 0; i < buttonGuardList.length; i++) {
        const guard = buttonGuardList[i];
        if (guard.allowed) {
          setPriceSol(guard.solPayment);
          setMaxMint(guard.displayMintLimit || maxMint);
          break;
        }
      }
    }
  }, [buttonGuardList]);

  // Increase/Decrease mint quantity
  const handleChange = (op: "increment" | "decrement") => {
    if (op === "decrement") {
      setCount((prev) => (prev > 1 ? prev - 1 : prev));
    } else {
      setCount((prev) => (prev < maxMint ? prev + 1 : prev));
    }
  };

  // Render guard selection on the right side
  const listItems = buttonGuardList.map((buttonGuard, index) => (
    <div key={index} className="tw-cursor-default" data-state="closed">
      <div
        onClick={() => {
          if (buttonGuard.allowed) {
            setCurrentMint(buttonGuard.label);
          }
        }}
        style={{ cursor: buttonGuard.allowed ? "pointer" : "default" }}
        className={`${
          currentMint === buttonGuard.label ? "selected-group" : ""
        } ${buttonGuard.allowed ? "allowed-group" : ""}
        csax tw-rounded-xl tw-border tw-border-solid tw-border-purple-1 tw-p-3 tw-flex
        tw-flex-col tw-gap-6 hover:tw-bg-purple-1 hover:tw-cursor-default`}
      >
        <div className="tw-flex tw-justify-between tw-items-center">
          <div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="tw-flex tw-items-center"
            >
              <div style={{ fontFamily: "Bakbak One", fontSize: "22px", color: "white" }}>
                {buttonGuard.header}
              </div>
              <p>{!connected || buttonGuard.allowed ? "" : "Wallet Not Allowed"}</p>
            </div>
          </div>
          {buttonGuard.endTime > createBigInt(0) &&
          buttonGuard.endTime - solanaTime > createBigInt(0) &&
          (!buttonGuard.startTime || buttonGuard.startTime - solanaTime <= createBigInt(0)) ? (
            <div>
              <p className="tw-text-light-gray-200">ENDS IN</p>
              <CountDown date={new Date(Number(buttonGuard.endTime) * 1000).toISOString()} />
            </div>
          ) : buttonGuard.startTime > createBigInt(0) &&
            buttonGuard.startTime - solanaTime > createBigInt(0) &&
            (!buttonGuard.endTime || solanaTime - buttonGuard.endTime <= createBigInt(0)) ? (
            <div>
              <p className="tw-text-light-gray-200">STARTS IN</p>
              <CountDown date={new Date(Number(buttonGuard.startTime) * 1000).toISOString()} />
            </div>
          ) : (
            <p style={{ fontSize: "40px", fontFamily: "Bakbak One" }} className="tw-text-light-gray-200">
              {buttonGuard.allowed ? "Mint is Live" : buttonGuard.tooltip}
            </p>
          )}
        </div>
        <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-white-1 tw-tracking-wide tw-text-sm">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <span>
                MAX <b>{buttonGuard.displayMintLimit} ELLY'S</b>
              </span>
              <b>🐘</b>
            </div>
            <div className="tw-inline-block" data-state="closed">
              PRICE {buttonGuard.solPayment}
              <b>🪙</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  // Render the actual "Mint" button(s)
  const showButton = buttonGuardList.map((buttonGuard, index) => (
    <Box key={index} style={{ display: currentMint === buttonGuard.label ? "block" : "none" }}>
      <VStack>
        <Tooltip label={buttonGuard.tooltip} aria-label="Mint button">
          <Button
            size="lg"
            variant="mint"
            className="tw-inline-flex dsca tw-justify-center tw-items-center tw-rounded
                       tw-text-sm tw-text-white-1 tw-py-0 tw-px-3 hover:tw-opacity-80
                       tw-transition tw-duration-300 tw-ease-in-out tw-bg-pink-primary
                       tw-grow tw-h-[44px]"
            onClick={() =>
              mintClick(
                umi,
                buttonGuard,
                candyMachine!,
                candyGuard!,
                ownedTokens,
                count || 1,
                mintsCreated,
                setMintsCreated,
                guardList,
                setGuardList,
                onOpen,
                setCheckEligibility,
                setWritePending,
                setMintFlowStep // pass our new function
              )
            }
            backgroundColor="#e42575"
            disabled={!connected || !buttonGuard.allowed || writePendingLocal}
            style={{ width: "100%", padding: "22px" }}
            isDisabled={!connected || !buttonGuard.allowed || writePendingLocal}
            isLoading={guardList.find((elem) => elem.label === buttonGuard.label)?.minting}
            loadingText={guardList.find((elem) => elem.label === buttonGuard.label)?.loadingText}
          >
            {!connected
              ? "Connect Wallet to Mint"
              : writePendingLocal
              ? "Minting..."
              : buttonGuard.buttonLabel}
          </Button>
        </Tooltip>
      </VStack>
    </Box>
  ));

  // Slider config
  const slideImages = [thumb1, thumb2, thumb3];
  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
    speed: 500,
    fade: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Sync local maxSupply & mintedNfts from candyMachine
  useEffect(() => {
    if (candyMachine && candyMachine.data) {
      setMaxSupply(Number(candyMachine.data.itemsAvailable));
      setMintedNfts(Number(candyMachine.itemsRedeemed));
    }
  }, [candyMachine]);

  return (
    <div className="row">
      {/* Left column with slider and main mint info */}
      <div className="col-md-6">
        <div className="mint_left_content">
          <div className="mint_left_inner">
            <div className="mint_slider">
              <ReactSlick {...sliderSettings}>
                {slideImages.map((img, idx) => (
                  <div key={idx} className="mint_thumb">
                    <img src={img.src} alt={`thumb-${idx}`} />
                  </div>
                ))}
              </ReactSlick>
            </div>

            {/* Mint Info */}
            <ul className="mint_count_list">
              {/* Remaining + progress bar */}
              <li>
                <h5>Remaining</h5>
                <h5>
                  {mintedNfts}/{maxSupply}
                </h5>
                {/* Progress bar */}
                <div
                  style={{
                    backgroundColor: "#333",
                    borderRadius: "4px",
                    height: "8px",
                    marginTop: "8px",
                  }}
                >
                  <div
                    style={{
                      width: `${maxSupply ? (mintedNfts / maxSupply) * 100 : 0}%`,
                      backgroundColor: "#e42575",
                      height: "100%",
                      borderRadius: "4px",
                      transition: "width 0.3s ease-in-out",
                    }}
                  />
                </div>
              </li>

              {/* SOL Price + approximate USD */}
              <li>
                <h5>Price</h5>
                <h5>
                  {priceSol} SOL (${singlePriceUsd})
                </h5>
              </li>

              {/* Quantity selector + total cost */}
              <li>
                <h5>Quantity</h5>
                <div className="mint_quantity_sect">
                  <button
                    className="input_number_decrement"
                    onClick={() => handleChange("decrement")}
                  >
                    -
                  </button>
                  <input className="input_number" type="text" value={count} readOnly />
                  <button
                    className="input_number_increment"
                    onClick={() => handleChange("increment")}
                  >
                    +
                  </button>
                </div>
                <h5>
                  <span>{(priceSol * count).toFixed(2)}</span> SOL (${totalPriceUsd})
                </h5>
              </li>

              {/* Approx. network fee */}
              <li>
                <h5>Fees</h5>
                <h5>Excluding Network Fee</h5>
              </li>
            </ul>

            {/* Guard-based mint button */}
            {showButton}
          </div>
        </div>
      </div>

      {/* Right column with guard list */}
      <div className="col-md-6">
        <div className="mint_right_content">
          {listItems}
          <div className="tw-pt-4 empty:tw-py-0 tw-border-t empty:tw-border-t-0">
            <div className="tw-flex tw-flex-col tw-gap-y-4">
              <div className="tw-flex tw-flex-col tw-gap-5 tw-p-4 tw-rounded-lg tw-bg-purple-2" />
            </div>
          </div>
          <div className="mint_btns">
            <a
              href="https://discord.gg/gjnKPwRRCc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                <img src={discordIcon.src} alt="icon" />
                Join Discord
              </Button>
            </a>
            <a
              href="https://twitter.com/LuckyEllyClub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                <img src={twitterIcon.src} alt="icon" />
                Join Twitter
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
