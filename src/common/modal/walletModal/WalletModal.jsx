import Link from "next/link";
import { useModal } from "@/src/utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import { isMetaMaskInstalled, connectWallet } from "@/src/lib/metamaskhandler";
import WalletModalStyleWrapper from "./WalletModal.style";

import hoverShape from "@/src/assets/images/icon/hov_shape_L.svg";
import metamaskIcon from "@/src/assets/images/icon/MetaMask.svg";
import formatic from "@/src/assets/images/icon/Formatic.svg";
import trustWalletIcon from "@/src/assets/images/icon/Trust_Wallet.svg";
import walletConnect from "@/src/assets/images/icon/WalletConnect.svg";
import { BrowserProvider, JsonRpcProvider, Contract, parseEther } from 'ethers';
import useWalletConnector from "@/src/hooks/useWalletConnect";
import { LECNFTAbi, lecNftContractAddress, pnutAbi, pnutContractAddress } from "@/src/contract";
import { useGlobalStates } from "@/src/store/useGlobalStates";




const WalletModal = () => {
  const { walletModalHandle, handleMetamaskModal, setAccounts, } = useModal();
  const contactDetails = useGlobalStates((state) => state.contactDetails);
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a provider instance from the ethereum object
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Create a provider instance from the ethereum object
        const network = await provider.getNetwork();
        // Get the signer (the connected account)
        const signer = provider.getSigner();
        // Get the wallet address
        const address = await signer.getAddress();

        const PNUT_CONTRACT = new Contract(pnutContractAddress, pnutAbi, signer);
        const LECNFT_CONTRACT = new Contract(lecNftContractAddress, LECNFTAbi, signer);


        contactDetails({
          PNUT_CONTRACT,
          LECNFT_CONTRACT,
          address: address,
          chainId: network?.chainId,
        });
        
        // Save the wallet address in state
        setAccounts({
          address,
          signer,
          chainId:network?.chainId,
          provider
        })
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  };

  const handleMetamask = async (e) => {
    e.preventDefault();
    if (!isMetaMaskInstalled()) {
      handleMetamaskModal();
      connectWallet()
    } else {
      const account = await connectWallet();
    }
  };

  return (
    <>
      <WalletModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>CONNECT WALLET</h2>
              <button onClick={() => walletModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <p>
                Please select a wallet to connect and start Minting your LEC NFTs
              </p>
              <div className="wallet_list">
                <Link href="# " onClick={(e) => handleMetamask(e)}>
                  <img src={metamaskIcon.src} alt="Meta-mask" />
                  MetaMask
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>

                <Link href="# ">
                  <img src={formatic.src} alt="Coinbase" />
                  Coinbase
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
                <Link href="# ">
                  <img src={trustWalletIcon.src} alt="Trust" />
                  Trust Wallet
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
                <Link href="# ">
                  <img src={walletConnect.src} alt="Wallet" />
                  WalletConnect
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
              </div>
              <div className="modal_bottom_text">
                By connecting your wallet, you agree to our
                <Link href="# ">Terms of Service</Link>
                <Link href="# ">Privacy Policy</Link>
              </div>
            </div>

            <div className="modal_bottom_shape_wrap">
              <span className="modal_bottom_shape shape_left">
                <img src={hoverShape.src} alt="bithu nft hover shape" />
              </span>
              <span className="modal_bottom_shape shape_right">
                <img src={hoverShape.src} alt="bithu nft hover shape" />
              </span>
            </div>
          </div>
        </div>
      </WalletModalStyleWrapper>
    </>
  );
};

export default WalletModal;
