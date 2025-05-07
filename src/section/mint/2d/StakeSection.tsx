"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AnchorProvider } from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";

import "react-toastify/dist/ReactToastify.css";

import ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Counter from "@/src/common/counter";
import bgShape1 from "@/src/assets/images/icon/square_shape_1.png";
import bgShape2 from "@/src/assets/images/icon/square_shape_2.png";

import "./style.css";

import CountDown from "@/src/common/countDown";
import Button from "@/src/common/button";
import Particle from "./Particles";
import MintStyleWrapper from "./Mint.style";

import { Box, Tooltip, VStack } from "@chakra-ui/react";

import {
  getNFTRecord,
  getNumberOfNFTs,
  getRecordCustodyVault,
  getStakeDetails,
  myNfts,
  myNftsbyIds,
  NFTType,
} from "../anchor/setup";
import {
  addBlockhash,
  addPayer,
  findATA,
  stakeTransaction,
  unStakeTransaction,
} from "../anchor/transactionBuilder";
import { Umi } from "@metaplex-foundation/umi";
import {
  DigitalAsset,
  fetchDigitalAsset,
  fetchJsonMetadata,
  JsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { useUmi } from "@/utils/useUmi";
import axios from "axios";
import CoinInfoCounterWrapper from "../../counter/v1/Counter.style";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  FlaskRoundIcon as Flask,
  Gauge,
} from "lucide-react";
import Image from "next/image";
import NFTCardComponent from "./NFTCard";
import NFTCardComponent2 from "./NFTCard2";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Modals from "./Modal";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";

const VERIFIED_COLLECTION = "GfvCGwrGQch2vegUXZkQm7up1N1jomwmLx6H5VQ92zTh";

export default function StakeSection() {
  const [provider, setProvider] = useState<AnchorProvider | null>(null);
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    const setup = async () => {
      if (wallet && publicKey && connected) {
        // @ts-ignore
        const provider = new AnchorProvider(connection, wallet, {
          preflightCommitment: "finalized",
        });
        anchor.setProvider(provider);
        setProvider(provider);
        console.log(provider);
      }
    };
    setup();
  }, [publicKey, connected]);

  const [findingNfts, setFindingNfts] = useState(false);
  const [findingStakedNfts, setfindingStakedNfts] = useState(false);
  const [ownedNfts, setOwnedNfts] = useState<any[]>([]);
  const [totalOwnedNfts, setTotalOwnedNfts] = useState(0);
  const [totalStakedNfts, setTotalStakedNfts] = useState(0);
  const [stakeDetailsState, setStakeDetailsState] = useState<any>();
  const [myStakedNftsIds, setMyStakedNfts] = useState<string[]>([]);
  const [allStakedNfts, setAllStakedNfts] = useState<
    { nftMint: PublicKey; staker: PublicKey }[]
  >([]);
  const [stakedNfts, setStakedNfts] = useState<any[]>([]);
  const [rewardPerSecond, setRewardPerSecond] = useState(0);
  const [ellysOnDuty, setEllysOnDuty] = useState("1237777");
  const [jarsProduced, setJarsProduced] = useState("152 M");
  const [isAnimating, setIsAnimating] = useState(false);
  const [counterValue, setCounterValue] = useState(152);
  const degens = useMotionValue(60);
  const output = useMotionValue(10.4);
  const pending = useMotionValue(78.3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", message: "" });

  const handleOpenModal = (title, message) => {
    setModalData({ title, message });
    setIsModalOpen(true);
  };

  const degensDisplay = useTransform(degens, (v) =>
    Math.max(0, parseFloat(v.toFixed(0)))
  );
  const outputDisplay = useTransform(
    output,
    (v) => `${Math.max(0, v).toFixed(1)}k`
  );
  const pendingDisplay = useTransform(
    pending,
    (v) => `${Math.max(0, v).toFixed(1)}m`
  );

  const [rawNFTs, setRawNFTs] = useState<
    {
      associatedTokenAddress: string;
      mint: string;
      name: string;
      symbol: string;
    }[]
  >([]);

  useEffect(() => {
    if (connected && wallet?.publicKey) {
      setFindingNfts(true);
      getNumberOfNFTs(wallet.publicKey).then((number) =>
        setTotalOwnedNfts(number)
      );
      myNfts(wallet?.publicKey)
        .then((data) => {
          setRawNFTs(data);
          console.log(data);
        })
        .then(() => setFindingNfts(false));

      getStakeDetails().then((x) => {
        console.log(x, " stake details full");

        setfindingStakedNfts(true);
        console.log(Number(x.reward), " rewards");
        setRewardPerSecond(Number(x.reward) / 10 ** 6);
        setStakeDetailsState(x);
        console.log(x.maxStakersCount.toString());
        setAllStakedNfts(x.stakedTokens);
        let mine = [];
        for (let i = 0; i < x.stakedTokens.length; i++) {
          if (
            x.stakedTokens[i].staker.toString() === wallet.publicKey.toString()
          )
            mine.push(x.stakedTokens[i].nftMint.toString());
        }
        setMyStakedNfts(mine);
        setTotalStakedNfts(mine.length);

        // myNftsbyIds(wallet.publicKey, mine).then((x)=>{setStakedNfts(x); console.log(x);setfindingStakedNfts(false)})
      });
    }
  }, [wallet?.publicKey]);

  const parseInitialValue = () => {
    return 152; // Initial value in millions
  };

  const handleClaim = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const initialValue = parseInitialValue();

    // Animate motion values to 0
    const controls = [
      animate(degens, 0, { duration: 1.5 }),
      animate(output, 0, { duration: 1.5 }),
      animate(pending, 0, { duration: 1.5 }),
    ];

    // Animate jarsProduced counter manually (similar to before)
    let current = initialValue;
    const interval = setInterval(() => {
      current -= 5;
      setCounterValue(current);

      if (current <= 0) {
        clearInterval(interval);
        setCounterValue(0);
        setJarsProduced("0 M");
      } else {
        setJarsProduced(`${current} M`);
      }
    }, 50);

    // When all framer animations and number interval complete
    Promise.all(controls.map((c) => c.finished)).then(() => {
      // Delay slightly to let jar counter animation also finish
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    });
  };

  return (
    <>
      {/* <Particle /> */}
      <div className="full-stake-bg">
        <div className="full-bg-page h-[1000px]">
          <div className="relative z-10 mx-auto max-w-[45rem] md:px-[1rem] top-[100px]">
            {/* Main Heading */}
            <h1
              className="text-center font-extrabold text-white machine-text"
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
            >
              The Machines Are On!
            </h1>

            {/* Subheading */}
            <p className="text-center text-xl text-white font-['lalezar']">
              Send your Ellys to work and fuel the sweetest
              <br />
              <span className="font-bold text-[#ffe400]  font-['lalezar']">
                $PBUTTA
              </span>{" "}
              factory on the blockchain.
            </p>

            {/* Stats Panel */}
            <div className="mt-6 rounded-xl bg-[#17031d] backdrop-blur-sm overflow-hidden max-w-2xl gradient-border-box">
              {/* Stats Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-3 p-3">
                <div className="p-4 bg-[#21062c] rounded-xl">
                  <p className="text-lg font-bold text-[#ffe400] mb-2 font-['lalezar']">
                    Degens On Duty
                  </p>
                  <div className="flex justify-center items-center gap-2">
                    <motion.p className="text-4xl font-bold text-white font-['alphakind'] degenText">
                      {degensDisplay}
                    </motion.p>
                  </div>
                </div>

                <div className="p-4 bg-[#21062c] rounded-xl">
                  <p className="text-lg font-bold text-[#60ff28] mb-2 font-['lalezar']">
                    Factory Output
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center gap-2">
                      <img src="/green.png" alt="greeb reward" />
                      <motion.p className="text-4xl font-bold text-white font-['alphakind'] factoryText">
                        {outputDisplay}
                      </motion.p>
                    </div>
                    <p className="text-xs text-white">$PBUTTA per sec</p>
                  </div>
                </div>

                <div className="p-4 bg-[#21062c] rounded-xl">
                  <p className="text-lg font-bold text-[#ff0030] mb-2 font-['lalezar']">
                    Pending $PBUTTA
                  </p>
                  <div className="flex justify-center items-center gap-2">
                    <img src="/red.png" alt="red reward" />
                    <motion.p className="text-4xl font-bold text-white font-['alphakind'] pendingText">
                      {pendingDisplay}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="bg-black/30 p-4 flex flex-col lg:flex-row gap-2 items-center">
                <div className="flex-1 flex flex-col xl:ml-32">
                  <p className="text-[18px] text-gray-300 font-['hyperspace'] hypeText">
                    Total Ellys on duty:{" "}
                    <span className="font-medium text-white">
                      {ellysOnDuty}
                    </span>
                  </p>
                  <p className="text-[18px] text-gray-300 font-['hyperspace'] hypeText">
                    Total <span className="text-yellow-300">$PBUTTA</span> Jars
                    Produced:{" "}
                    <AnimatePresence mode="wait">
                      <motion.span
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`font-medium text-white ${
                          counterValue <= 20 && counterValue > 0
                            ? "text-red-400"
                            : ""
                        } ${counterValue === 0 ? "text-green-400" : ""}`}
                      >
                        <motion.span
                          key={counterValue}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          {counterValue} M
                        </motion.span>
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </div>

                <button
                  className={`rounded-3xl ${
                    isAnimating ? "bg-[#260e2c]" : "bg-[#1e0a25]"
                  } px-4 py-2 font-bold text-white shadow-lg hover:from-purple-700 transition-all duration-300 ease-in-out
hover:bg-[#4a1760] hover:text-[#ffcc00] hover:border-[#ff44cc] 
hover:shadow-[0_0_15px_#b44ecc] hover:scale-105 hover:translate-y-[-2px]
active:scale-95 border-t-2 border-[#833497]`}
                  onClick={handleClaim}
                  disabled={isAnimating}
                  style={{ fontFamily: "'Comic Relief', sans-serif" }}
                >
                  {isAnimating ? "Claiming..." : "Claim All Jars"}
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-40 flex justify-between items-center top-[150px]">
            <div>
              <Image
                src="/left-line.png"
                width={500}
                height={50}
                alt="left"
                unoptimized
                className="hidden xl:block"
              />
            </div>
            <div className="text-2xl xl:text-3xl font-bold font-['alphakind'] mb-[0.75rem] lg:mb-0 xl:mb-0">
              Your Ellys On The Line (6)
            </div>
            <div>
              <Image
                src="/right-line.png"
                width={500}
                height={50}
                alt="left"
                unoptimized
                className="hidden xl:block"
              />
            </div>
          </div>
          <div className="relative !hidden md:!block">
            {/* NFT Cards container */}
            <div className="relative z-20 top-[150px] flex gap-3 items-center overflow-x-auto px-3 hide-scrollbar">
              <Swiper
                breakpoints={{
                  340: {
                    slidesPerView: 1.2,
                    spaceBetween: 15,
                  },
                  700: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  991: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1700: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <NFTCardComponent
                    imageUrl="/teaser.jpg"
                    onLunchBreakClick={handleOpenModal}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NFTCardComponent
                    imageUrl="/teaser.jpg"
                    onLunchBreakClick={handleOpenModal}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NFTCardComponent
                    imageUrl="/teaser.jpg"
                    onLunchBreakClick={handleOpenModal}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NFTCardComponent
                    imageUrl="/teaser.jpg"
                    onLunchBreakClick={handleOpenModal}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <NFTCardComponent
                    imageUrl="/teaser.jpg"
                    onLunchBreakClick={handleOpenModal}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className="md:!hidden relative z-20 top-[150px] flex gap-3 items-center overflow-x-auto px-3 hide-scrollbar">
            <NFTCardComponent
              imageUrl="/teaser.jpg"
              onLunchBreakClick={handleOpenModal}
            />
            <NFTCardComponent
              imageUrl="/teaser.jpg"
              onLunchBreakClick={handleOpenModal}
            />
            <NFTCardComponent
              imageUrl="/teaser.jpg"
              onLunchBreakClick={handleOpenModal}
            />
            <NFTCardComponent
              imageUrl="/teaser.jpg"
              onLunchBreakClick={handleOpenModal}
            />
            <NFTCardComponent
              imageUrl="/teaser.jpg"
              onLunchBreakClick={handleOpenModal}
            />
          </div>

          <div className="mt-[90px] md:mt-[40px] lg:mt-[0px] xl:mt-[-80px]">
            <Image
              src="/belt.png"
              width={5000}
              height={300}
              alt="bg"
              unoptimized
            />
          </div>
        </div>
        <div className="relative z-30 top-[500px]">
          <div className="w-full">
            <Image
              src="/line.jpg"
              width={5000}
              height={300}
              alt="line"
              unoptimized
              className="hidden lg:block w-full"
            />
          </div>
          <div className="absolute top-[350px] md:top-[250px] lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="font-bold text-2xl xl:text-3xl font-['alphakind'] text-center">
              Your Ellys (46)
            </p>
          </div>
        </div>
        <div className="relative !hidden md:!block">
          <div className="relative z-20 top-[810px] lg:top-[500px] flex gap-3 items-center overflow-x-auto px-3 hide-scrollbar">
            <Swiper
              breakpoints={{
                340: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                },
                700: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                991: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1700: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              freeMode={true}
              modules={[FreeMode]}
              className="mySwiper"
            >
              <SwiperSlide>
                <NFTCardComponent2
                  imageUrl="/teaser.jpg"
                  onLunchBreakClick={handleOpenModal}
                />
              </SwiperSlide>
              <SwiperSlide>
                <NFTCardComponent2
                  imageUrl="/teaser.jpg"
                  onLunchBreakClick={handleOpenModal}
                />
              </SwiperSlide>
              <SwiperSlide>
                <NFTCardComponent2
                  imageUrl="/teaser.jpg"
                  onLunchBreakClick={handleOpenModal}
                />
              </SwiperSlide>
              <SwiperSlide>
                <NFTCardComponent2
                  imageUrl="/teaser.jpg"
                  onLunchBreakClick={handleOpenModal}
                />
              </SwiperSlide>
              <SwiperSlide>
                <NFTCardComponent2
                  imageUrl="/teaser.jpg"
                  onLunchBreakClick={handleOpenModal}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="md:!hidden relative z-20 top-[860px] lg:top-[500px] flex gap-3 items-center overflow-x-auto px-3 hide-scrollbar">
          <NFTCardComponent2
            imageUrl="/teaser.jpg"
            onLunchBreakClick={handleOpenModal}
          />
          <NFTCardComponent2
            imageUrl="/teaser.jpg"
            onLunchBreakClick={handleOpenModal}
          />
          <NFTCardComponent2
            imageUrl="/teaser.jpg"
            onLunchBreakClick={handleOpenModal}
          />
          <NFTCardComponent2
            imageUrl="/teaser.jpg"
            onLunchBreakClick={handleOpenModal}
          />
          <NFTCardComponent2
            imageUrl="/teaser.jpg"
            onLunchBreakClick={handleOpenModal}
          />
        </div>
      </div>
      <Modals
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalData.title}
        message={modalData.message}
      />
    </>
  );
}

function NFTCard({
  nft,
}: {
  nft: {
    associatedTokenAddress: string;
    mint: string;
    name: string;
    symbol: string;
  };
}) {
  const umi = useUmi();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(true);
  const [nftToView, setNftToView] = useState<NFTType | null>(null);
  const [image, setImage] = useState("https://i.gifer.com/ZKZg.gif");

  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();
  const [opacity, setOpacity] = useState(1);
  const [closeWidth, setCloseWidth] = useState(false);

  const fetchNft = async (nftMint: string) => {
    let digitalAsset: DigitalAsset | undefined;
    let jsonMetadata: JsonMetadata | undefined;
    try {
      // @ts-ignore
      digitalAsset = await fetchDigitalAsset(umi, new PublicKey(nftMint));
      console.log(digitalAsset, "digital Asset");
      // @ts-ignore
      // if(digitalAsset.metadata?.collection?.value?.key !== VERIFIED_COLLECTION ){
      //   setVerified(false)
      //   setLoading(false)
      //   return
      // }

      const { nftCustody, nftRecord, stakeTokenVault } =
        await getRecordCustodyVault(new PublicKey(nftMint));

      const n: NFTType = {
        details: {
          name: digitalAsset.metadata.name,
          symbol: digitalAsset.metadata.symbol,
          image: image,
        },
        edition: new PublicKey(digitalAsset?.edition?.publicKey || ""),
        metadata: new PublicKey(digitalAsset?.metadata?.publicKey || ""),
        nftCustody,
        nftRecord,
        stakeTokenVault,
        nftMint: new PublicKey(nftMint),
        nftToken: new PublicKey(nft.associatedTokenAddress),
      };

      setNftToView(n);

      try {
        const { data } = await axios.get(digitalAsset.metadata.uri);
        if (data && data.image) {
          n.details.image = data.image;
          setNftToView(n);
          console.log(n);
          setImage(data.image);
        }
      } catch (error) {
        setVerified(false);
      }
    } catch (e) {
      console.error(e);
      setVerified(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNft(nft.mint);
  }, []);

  const handleStake = async () => {
    if (!wallet || !wallet.publicKey || !nftToView) return;

    const x: NFTType = nftToView;

    let transaction = await stakeTransaction(
      wallet,
      x.nftMint,
      x.nftToken,
      x.metadata,
      x.edition
    );
    transaction = await addBlockhash(transaction, connection);
    transaction = await addPayer(transaction, wallet.publicKey);

    sendTransaction(transaction, connection)
      .then((tx) => {
        console.log(tx);
        console.log("succeded");
        toast.success("Staking Completed.");

        // Fancy animation
        setTimeout(() => {
          setOpacity(0);
          setTimeout(() => {
            setCloseWidth(true);
            setTimeout(() => {
              setVerified(false);
            }, 1000);
          }, 2000);
        }, 1000);
      })
      .catch((e) => {
        console.log("Error: ", e);
        toast.error("Something went wrong.");
      });

    toast.info("Transaction sent, kindly confirm.");
  };

  return (
    <div
      style={{
        display: verified ? "" : "none",
        opacity: opacity,
        transition: "all 0.5s",
        margin: closeWidth ? "0 -14px" : "",
      }}
    >
      <div
        style={{
          width: closeWidth ? "0px" : "240px",
          height: "auto",
          transition: "all 0.5s",
        }}
      >
        <img src={image} style={{ width: "100%" }} className="nftc" />
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            handleStake();
          }}
          style={{ width: "100%", marginTop: "18px" }}
        >
          Stake{" "}
          {nft.name.includes("#") ? "#" + nft.name.split("#")[1] : nft.name}
        </Button>
      </div>
    </div>
  );
}

function StakedNFTCard({ mint }: any) {
  const umi = useUmi();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(true);
  const [nftToView, setNftToView] = useState<NFTType | null>(null);
  const [image, setImage] = useState("https://i.gifer.com/ZKZg.gif");

  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();

  const fetchNft = async (nftMint: string) => {
    let digitalAsset: DigitalAsset | undefined;
    let jsonMetadata: JsonMetadata | undefined;
    try {
      // @ts-ignore
      digitalAsset = await fetchDigitalAsset(umi, new PublicKey(nftMint));
      console.log(digitalAsset, "digital Asset");

      const { nftCustody, nftRecord, stakeTokenVault } =
        await getRecordCustodyVault(new PublicKey(nftMint));

      const associatedTokenAddress = await findATA(
        wallet?.publicKey as PublicKey,
        new PublicKey(mint)
      );

      const n: NFTType = {
        details: {
          name: digitalAsset.metadata.name,
          symbol: digitalAsset.metadata.symbol,
          image: image,
        },
        edition: new PublicKey(digitalAsset?.edition?.publicKey || ""),
        metadata: new PublicKey(digitalAsset?.metadata?.publicKey || ""),
        nftCustody,
        nftRecord,
        stakeTokenVault,
        nftMint: new PublicKey(nftMint),
        nftToken: associatedTokenAddress,
      };

      setNftToView(n);

      try {
        const { data } = await axios.get(digitalAsset.metadata.uri);
        if (data && data.image) {
          n.details.image = data.image;
          setNftToView(n);
          console.log(n);
          setImage(data.image);
        }
      } catch (error) {
        setVerified(false);
      }
    } catch (e) {
      console.error(e);
      setVerified(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("staked, ", mint);
    fetchNft(mint);
  }, []);

  const handleUnstake = async () => {
    if (!wallet || !wallet.publicKey || !nftToView) return;

    const x: NFTType = nftToView;

    let transaction = await unStakeTransaction(wallet, x.nftMint, x.nftToken);
    transaction = await addBlockhash(transaction, connection);
    transaction = await addPayer(transaction, wallet.publicKey);

    sendTransaction(transaction, connection)
      .then((tx) => {
        console.log(tx);
        console.log("succeded");
        toast.success("Unstaking completed.");
      })
      .catch((e) => {
        console.log("Error: ", e);
        toast.error("Something went wrong.");
      });

    toast.info("Transaction sent, kindly confirm.");
  };

  return (
    <div style={{ display: "inline-block" }}>
      <div
        onClick={handleUnstake}
        style={{
          position: "relative",
          textAlign: "center",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="image-stake nftc"
      >
        <p className="unsttake">Unstake</p>
      </div>
    </div>
  );
}
