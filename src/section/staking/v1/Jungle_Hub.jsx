/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ParticipantStyledWrapper from "./JungleHub.style";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { useEffect, useState } from "react";
import { nftAbi } from "../nftAbi";
import { pnutAbi } from "../pnutAbi";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Jungle_Hub() {
  const [totalMinted, setTotalMinted] = useState("...");
  const [nftBalance, setNftBalance] = useState("...");
  const [pnutBalance, setPnutBalance] = useState("...");
  const [communityWalletBalance, setCommunityWalletBalance] = useState(0); // Community Multisig wallet balance

  const { address } = useAccount(); // Get the connected wallet address
  const contractAddress = "0x42de23cc51A8425C248C9801395DD47BD1996152";
  const pnutContractAddress = "0xd6eb4830f5c278E017c0F0aab59c7a51140Ec7EF";

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  

  // Community Multisig Wallet Address
  const multisigWalletAddress = "0x889411C388E83Fe69dE4F7193b766406697fe7DB";

  // Fetch the user's ETH balance
  const { data: balanceData } = useBalance({ address });

  // Fetch the multisig wallet ETH balance
  const { data: multisigBalanceData } = useBalance({
    address: multisigWalletAddress, // Multisig Wallet Address
  });

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

  // Make sure to only fetch data if the address exists (wallet is connected)
  const { data: readData, error: readError, isPending: readPending } = useReadContracts({
    contracts: address ? [  // Only include contracts if the wallet is connected
      {
        address: contractAddress,
        abi: nftAbi,
        functionName: "totalSupply",
      },
      {
        address: contractAddress,
        abi: nftAbi,
        functionName: "balanceOf",
        args: [address],  // Pass the connected wallet address
      },
      {
        address: pnutContractAddress,
        abi: pnutAbi,
        functionName: "balanceOf",
        args: [address],  // Pass the connected wallet address
      },
    ] : [],  // If the wallet is not connected, pass an empty array
  });

  const Gifts_Data = [
    {
      id: 1,
      title: "Total Diamond holders",
      desc: "+ 45%",
      imgUrl: "/assets/svg/Staking_Page/Diamond.svg",
      text_shadow: "0px 0px 6px rgba(0, 253, 0, 1)",
      color: "rgba(0, 253, 0, 1)",
    },
    {
      id: 2,
      title: "Community Wallet",
      desc: `${parseFloat(communityWalletBalance).toFixed(3)} ETH`, // Display multisig wallet balance
      imgUrl: "/assets/svg/Staking_Page/MoneyLock.svg",
      text_shadow: "4px 4px 13px #e23f3f",
      color: "#e23f3f",
    },
    {
      id: 3,
      title: "My $pnut balance",
      desc: `${pnutBalance} $pnut`,
      imgUrl: "/assets/svg/Staking_Page/Peanuts.svg",
      text_shadow: "0px 0px 6px rgba(0, 253, 0, 1)",
      color: "rgba(0, 253, 0, 1)",
    },
  ];

  useEffect(() => {
    if (!readPending) {
      readData?.[0]?.status === "success" && setTotalMinted(readData[0]?.result.toString());
      readData?.[1]?.status === "success" && setNftBalance(readData[1]?.result.toString());
      readData?.[2]?.status === "success" && setPnutBalance(readData[2]?.result.toString());

      // Handle errors if any of the contract reads fail
      readData?.[0]?.status === "failure" && tostMessage(readData[0]?.error.shortMessage, "error");
      readData?.[1]?.status === "failure" && tostMessage(readData[1]?.error.shortMessage, "error");
      readData?.[2]?.status === "failure" && tostMessage(readData[2]?.error.shortMessage, "error");
    }
    if (readError) {
      console.log(readError?.shortMessage);
    }
  }, [readData, readError, readPending]);

  // Fetch the community multisig wallet balance and set it in the component state
  useEffect(() => {
    if (multisigBalanceData?.formatted) {
      setCommunityWalletBalance(parseFloat(multisigBalanceData?.formatted)); // Set the multisig wallet balance
    }
  }, [multisigBalanceData]);

  return (
    <ParticipantStyledWrapper>
      <ToastContainer />
      <div className="main_logo">
        <img src="/assets/images/LuckyElephant.png" alt="bithu nft logo" />
        <p className="header-content logo-text" style={{}}>
          Lucky jungle hub
        </p>
      </div>
      <div className="Jungle_Hub_main">
        <div className="jungle_hub_left_section">
          <div className="balance_headings">
            <p>Available Balance</p>
            <img src="/assets/svg/Staking_Page/Dash.svg" alt="strings_logo" />
          </div>
          {/* Safely fallback to "0.00 ETH" if balanceData is not available */}
          <p className="eth_heading">
            {(balanceData?.formatted && !isNaN(parseFloat(balanceData?.formatted))) 
              ? parseFloat(balanceData.formatted).toFixed(3) 
              : "0.00"} ETH
          </p>
          <div className="pricing_stratygies">
            <div className="left_section">
              <p>total lec nfts</p>
              <p>{totalMinted || "508"}/8888</p>
            </div>
            <div className="right_section">
              <p>nfts owned</p>
              <p>{nftBalance || 0}</p>
            </div>
          </div>
          <div className="jungle_hub_earnings">
            <div className="left_section">
              <p className="earnings_heading">Daily Earnings</p>
              <div>
                {/* Safely fallback to "0 $pnuts" if nftBalance is NaN */}
                <p>{(nftBalance && !isNaN(parseFloat(nftBalance))) ? nftBalance * 10 : 0} $pnuts</p>
                <img src="/assets/svg/Staking_Page/Graph.svg" alt="graph_logo" />
              </div>
            </div>
            <div className="right_section">
              <p className="input_heading">1 = $PNUT price</p>
              <div>
                <p>{`N/A`}</p>
                <img src="/assets/svg/Staking_Page/HandMoneyLock.svg" alt="price_hand_logo" />
              </div>
            </div>
          </div>
          <p className="rewards_heading">total rewards</p>
          <p className="pnuts_heading">{0 || 0} $pnuts</p>

          {/* Contract Addresses */}
          <div className="contract-box" style={{ marginTop: '15px' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>Contract Addresses:</p>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px', fontSize: '13px' }}>
                <strong>Peanut ($PNUT): </strong>
                <a
                  href={`https://etherscan.io/address/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#39FF14' }}
                >
                  {shortenAddress(contractAddress)}
                </a>
              </li>
              <li style={{ fontSize: '13px' }}>
                <strong>iPeanut (Yield Token): </strong>
                <a
                  href={`https://etherscan.io/address/${pnutContractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#39FF14' }}
                >
                  {shortenAddress(pnutContractAddress)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Jungle Hub Right Section */}
        <div className="jungle_hub_right_section">
          {Gifts_Data.map((item, idx) => (
            <div key={idx} className={`${idx === 1 ? "margin_class" : "section_cards"}`}>
              <p className="map_heading ">{item.title}</p>
              <div className="img_content ">
                <p style={{ color: `${item.color}`, textShadow: `${item.text_shadow}` }}>
                  {item.desc}
                </p>
                <img src={item.imgUrl} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ParticipantStyledWrapper>
  );
}
