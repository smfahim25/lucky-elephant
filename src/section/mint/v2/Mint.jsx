"use client";
/**********************************************************************************************
 * FILE: src/section/mint/v2/Mint.jsx
 *
 * This file handles the Ethereum (3D) NFT minting page.
 * It uses wagmi hooks for reading and writing contract data and Reown AppKit for the modal.
 * All styling, slider logic, and contract calls are preserved.
 **********************************************************************************************/

import Link from "next/link";
import { useEffect, useState } from "react";
import CountdDown from "@/src/common/countDown";
import { Slider, SliderItem } from "@/src/common/slider/Slider";
import Button from "@/src/common/button";
import Particle from "./Particles";
import MintStyleWrapper from "./Mint.style";

import thumb1 from "@/src/assets/images/nft/v4-slider-img.png";
import thumb2 from "@/src/assets/images/nft/v4-slider-img2.png";
import thumb3 from "@/src/assets/images/nft/v4-slider-img3.png";
import checkIcon from "@/src/assets/images/icon/mint-right-text-icon.svg";
import discordIcon from "@/src/assets/images/icon/dis_logo.svg";
import twitterIcon from "@/src/assets/images/icon/Twitter.svg";

import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  maxMintPerAddressABI,
  maxSupplyABI,
  mintedNFTsAbi,
  mintPriceABI,
  publicMintABI,
  whitelistMintOGsABI,
  whitelistMintLuckyListABI,
  whitelistMintGenesisABI,
} from "../ab";
import whitelist from "../whitelist.json";

// Replace old useWeb3Modal with Reown AppKit
import { useAppKit } from "@reown/appkit/react";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mint = () => {
  const [count, setCount] = useState(1);
  const { address, isConnected } = useAccount();

  // Ethereum contract address and sales mode for whitelist
  const contractAddress = "0x42de23cc51A8425C248C9801395DD47BD1996152";
  const salesMode = 3; // Whitelist mode

  const [mintPrice, setMintPrice] = useState("...");
  const [maxSupply, setMaxSupply] = useState("...");
  const [maxMint, setMaxMint] = useState("...");
  const [mintedNfts, setMintedNfts] = useState("...");

  const { open } = useAppKit();

  const slideImages = [thumb1, thumb2, thumb3];
  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
    speed: 500,
    fade: true,
    autoplaySpeed: 500,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const tostMessage = (message, type) => {
    toast[type](message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Reading contract data via wagmi
  const { data: readData, error: readError, isPending: readPending } =
    useReadContracts({
      contracts: [
        {
          address: contractAddress,
          abi: [mintPriceABI],
          functionName: "_price",
          args: [salesMode],
        },
        {
          address: contractAddress,
          abi: [maxSupplyABI],
          functionName: "_maxSupply",
          args: [salesMode],
        },
        {
          address: contractAddress,
          abi: [mintedNFTsAbi],
          functionName: "_minted",
          args: [salesMode],
        },
        {
          address: contractAddress,
          abi: [maxMintPerAddressABI],
          functionName: "_maxMintPerAddress",
          args: [salesMode],
        },
      ],
    });

  // For writing (calling mint function)
  const { data: hash, error: writeError, isPending: writePending, writeContract } =
    useWriteContract();

  // Called when user clicks "MINT NOW"
  const mintHandler = () => {
    if (salesMode === 4) {
      // Public mint
      writeContract({
        address: contractAddress,
        abi: [publicMintABI],
        functionName: "publicMint",
        args: [address, count],
        value: parseEther((parseFloat(mintPrice) * count).toFixed(3)),
      });
    }
    if (salesMode === 3) {
      // LuckyList
      if (whitelist[address]) {
        writeContract({
          address: contractAddress,
          abi: [whitelistMintLuckyListABI],
          functionName: "whitelistMintLuckyList",
          args: [count, whitelist[address]],
          value: parseEther((parseFloat(mintPrice) * count).toFixed(3)),
        });
      } else {
        tostMessage("You are not whitelisted", "error");
      }
    }
    if (salesMode === 2) {
      // OG
      if (whitelist[address]) {
        writeContract({
          address: contractAddress,
          abi: [whitelistMintOGsABI],
          functionName: "whitelistMintOGs",
          args: [count, whitelist[address]],
          value: parseEther((parseFloat(mintPrice) * count).toFixed(3)),
        });
      } else {
        tostMessage("You are not whitelisted", "error");
      }
    }
    if (salesMode === 1) {
      // Genesis
      if (whitelist[address]) {
        writeContract({
          address: contractAddress,
          abi: [whitelistMintGenesisABI],
          functionName: "whitelistMintGenesis",
          args: [count, whitelist[address]],
          value: parseEther((parseFloat(mintPrice) * count).toFixed(3)),
        });
      } else {
        tostMessage("You are not whitelisted", "error");
      }
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  console.log({ writePending, isConfirming, isConfirmed, salesMode, writeError });

  useEffect(() => {
    if (writeError) tostMessage(writeError?.shortMessage, "error");
    if (isConfirmed) tostMessage("Transaction confirmed!", "success");
  }, [writeError, isConfirmed]);

  useEffect(() => {
    if (!readPending) {
      if (readData[0]?.status === "success") {
        setMintPrice(formatEther(readData[0]?.result));
      }
      if (readData[1]?.status === "success") {
        setMaxSupply(parseInt(readData[1]?.result.toString()));
      }
      if (readData[2]?.status === "success") {
        setMintedNfts(parseInt(readData[2]?.result.toString()));
      }
      if (readData[3]?.status === "success") {
        setMaxMint(parseInt(readData[3]?.result.toString()));
      }
      if (readData[0]?.status === "failure") {
        tostMessage(readData[0]?.error.shortMessage, "error");
      }
      if (readData[1]?.status === "failure") {
        tostMessage(readData[1]?.error.shortMessage, "error");
      }
      if (readData[2]?.status === "failure") {
        tostMessage(readData[2]?.error.shortMessage, "error");
      }
      if (readData[3]?.status === "failure") {
        tostMessage(readData[3]?.error.shortMessage, "error");
      }
    }
    if (readError) {
      console.log(readError?.shortMessage);
    }
  }, [readData, readError, readPending]);

  // Fixed countdown date for whitelist period
  const whitelistEndDate = new Date("2024-11-30T12:00:00Z");

  return (
    <MintStyleWrapper>
      <ToastContainer />
      <Particle />
      <div className="container">
        <div className="row">
          {/* LEFT SECTION */}
          <div className="col-md-6">
            <div className="mint_left_content">
              <div className="mint_left_inner">
                <div className="mint_slider">
                  <Slider {...sliderSettings}>
                    {slideImages?.map((thumb, idx) => (
                      <SliderItem key={idx}>
                        <div className="mint_thumb">
                          <img src={thumb.src} alt="thumb" />
                        </div>
                      </SliderItem>
                    ))}
                  </Slider>
                </div>
                <ul className="mint_count_list">
                  <li>
                    <h5>Remaining</h5>
                    <h5>
                      {mintedNfts}/<span>{maxSupply || 0}</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5>{mintPrice} ETH</h5>
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button className="input_number_decrement" onClick={() => (count > 1 ? setCount(count - 1) : count)}>
                        -
                      </button>
                      <input className="input_number" type="text" value={count} readOnly />
                      <button className="input_number_increment" onClick={() => (count < maxMint ? setCount(count + 1) : count)}>
                        +
                      </button>
                    </div>
                    <h5>
                      <span>{(parseFloat(mintPrice) * count).toFixed(3)}</span> ETH
                    </h5>
                  </li>
                </ul>
                <Button
                  size="lg"
                  variant="mint"
                  onClick={() => (isConnected ? mintHandler() : open())}
                  disabled={writePending || mintedNfts >= maxSupply}
                >
                  {writePending ? "Loading..." : "MINT NOW"}
                </Button>
              </div>
            </div>
          </div>
          {/* RIGHT SECTION */}
          <div className="col-md-6">
            <div className="mint_right_content">
              <div className="content_header">
                <h4>
                  PHASE #1 : OGs SOLDOUT
                  <span>
                    <img src={checkIcon.src} alt="icon" />
                  </span>
                </h4>
                <h4>PHASE#2 : WHITELIST LOADING</h4>
                <h1>MINTING SOON</h1>
              </div>
              <div className="mint_timer">
                <h5>Whitelist Starts Soon</h5>
                <CountdDown date={whitelistEndDate} />
              </div>
              <div className="content_footer">
                <h5>Max {maxMint} NFTs per wallet</h5>
                <h5>{mintPrice} ETH + gas</h5>
                <h5>Stay Tuned...</h5>
              </div>
              <div className="mint_btns">
                <a href="https://discord.gg/gjnKPwRRCc" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">
                    <img src={discordIcon.src} alt="Discord" />
                    Join Discord
                  </Button>
                </a>
                <a href="https://twitter.com/LuckyEllyClub" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">
                    <img src={twitterIcon.src} alt="Twitter" />
                    Join Twitter
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MintStyleWrapper>
  );
};

export default Mint;
