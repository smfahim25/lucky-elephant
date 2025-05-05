import React, { useState } from 'react';
import MintButton from '../../components/mint/MintButton';
import MintHeader from '../../components/mint/MintHeader';
import MintJoinMessage from '../../components/mint/MintJoinMessage';
import MintPriceAndSupply from '../../components/mint/MintPriceAndSupply';
import MintQuantity from '../../components/mint/MintQuantity';
import MintTotalPrice from '../../components/mint/MintTotalPrice';
import Header from '../../components/header/Header';
import { usePrepareContractWrite, useContractWrite, useAccount, useContractRead, useWaitForTransaction } from 'wagmi';
import { maxMintPerAddressABI, maxSupplyABI, mintedNFTsAbi, mintPriceABI, publicMintABI, whitelistMintOGsABI, whitelistMintLuckyListABI } from '../../components/mint/ab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatEther, parseEther } from 'viem';
import whitelist from './whitelist.json';


export const Mint = () => {
  const { address, isConnected } = useAccount();
  const contractAddress = "0x42de23cc51A8425C248C9801395DD47BD1996152";
  const [mintPrice, setMintPrice] = useState('...');
  const [maxSupply, setMaxSupply] = useState('...');
  const [maxMint, setMaxMint] = useState('...');
  const [mintedNfts, setMintedNfts] = useState('...');
  const [mintQuantity, setMintQuantity] = useState('...');
  const salesMode = 2; // Set this to 3 for whitelist mode

  const { isLoading: mintPriceLoading, data: _data } = useContractRead({
    address: contractAddress,
    abi: [mintPriceABI],
    functionName: "_price",
    args: [salesMode],
    onSuccess: (data) => {
      setMintPrice(formatEther(data));
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { isLoading: maxSupplyLoading } = useContractRead({
    address: contractAddress,
    abi: [maxSupplyABI],
    functionName: "_maxSupply",
    args: [salesMode],
    onSuccess: (data) => {
      setMaxSupply(parseInt(data?.toString()));
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { isLoading: loadingPrice } = useContractRead({
    address: contractAddress,
    abi: [mintPriceABI],
    functionName: "_price",
    args: [salesMode],
    onSuccess: (data) => {
      setMintPrice(formatEther(data));
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { isLoading: mintNftsLoading } = useContractRead({
    address: contractAddress,
    abi: [mintedNFTsAbi],
    functionName: "_minted",
    args: [salesMode],
    onSuccess: (data) => {
      setMintedNfts(parseInt(data?.toString()));
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const { isLoading: maxMintPerAddressLoading } = useContractRead({
    address: contractAddress,
    abi: [maxMintPerAddressABI],
    functionName: "_maxMintPerAddress",
    args: [salesMode],
    onSuccess: (data) => {
      setMaxMint(parseInt(data?.toString()));
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const merkleProof = whitelist[address] || [];

  const {config} = usePrepareContractWrite({
    address: contractAddress,
    abi: [whitelistMintOGsABI],
    functionName: "whitelistMintOGs",
    args: [mintQuantity, whitelist[address]],  // Corrected arguments
    value: mintPrice !== '...' && mintQuantity !== '...'?parseEther((parseFloat(mintPrice)*parseInt(mintQuantity)).toFixed(2)):0,
    onSuccess: (data)=> {
      console.log(data)
    },
    onError: (error)=>{
      console.log(error)
    },
    enabled: isConnected && mintPrice && mintQuantity && mintPrice !== '...' && mintQuantity !== '...',
})


  const { write, data } = useContractWrite(config);

  const notify = (message) => toast(message);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: (data) => {
      toast.success("Mint Successful!", {
        position: toast.POSITION.TOP_LEFT
      });
    },
    onError: (error) => {
      toast.error("Mint Failed!", {
        position: toast.POSITION.TOP_LEFT
      });
    }
  });

  return (
    <>
      <Header />
      <main className="main container-fluid">
        <div className="position-absolute r">
          <img src="./assets/img/bg/9.png" alt="" />
        </div>
        <div className='row mintWrapper w-100 mx-0'>
          <div className='col-md-6 d-flex align-items-center justify-content-center'>
            <MintJoinMessage />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className='mintContainer p-4' id="target">
              <MintHeader />
              <MintPriceAndSupply mintPrice={mintPrice} maxSupply={maxSupply} mintedNfts={mintedNfts} />
              <MintQuantity mintQuantity={mintQuantity} setMintQuantity={setMintQuantity} maxMint={maxMint} />
              <MintTotalPrice mintPrice={mintPrice} mintQuantity={mintQuantity} />
              <MintButton isConnected={isConnected} mint={write} isMinting={isLoading} mintPrice={mintPrice} mintQuantity={mintQuantity} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
