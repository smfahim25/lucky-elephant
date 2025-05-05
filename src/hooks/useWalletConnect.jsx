import { Contract, ethers } from 'ethers';
import { useCallback } from 'react';
import { CHAIN_ID, LECNFTAbi, lecNftContractAddress, pnutAbi, pnutContractAddress } from '../contract';
import { useGlobalStates } from '../store/useGlobalStates';
import { useModal } from '../utils/ModalContext';

const useWalletConnector =  () => {
  const values = useModal()
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const network = await provider.getNetwork();
  // // Get the signer (the connected account)
  // const signer = provider.getSigner();
  // const chainId = network?.chainId;
  // const account = await signer.getAddress();
  // console.log("🚀 ~ useWalletConnector ~ signer:",account, chainId, signer)
// const contactDetails = useGlobalStates((state) => state.contactDetails);
  // // const provider = useProvider();

  const onConnect = useCallback(async () => {
  //   try {
  //     const isChainId = chainId === CHAIN_ID;
  //     console.log("🚀 ~ onConnect ~ isChainId:",chainId, isChainId)
  //     if (account && isChainId) {
  //       // instantiate contract instance and assign to component ref variable

  //       const PNUT_CONTRACT = new Contract(pnutContractAddress, pnutAbi, signer);
  //       console.log("🚀 ~ onConnect ~ PNUT_CONTRACT:", PNUT_CONTRACT)
  //       const LECNFT_CONTRACT = new Contract(lecNftContractAddress, LECNFTAbi, signer);


  //       contactDetails({
  //         PNUT_CONTRACT,
  //         LECNFT_CONTRACT,
  //         address: accounts.address,
  //         chainId,
  //       });
  //     } else {
  //       if (account) {
  //         // notify('Change Network Mumbai Testnet 80001');
  //       }
  //       console.log('network is not connected ');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  }, [])
  // [account, contactDetails,signer, chainId]);

  return {
    onConnect,
  };
};

export default useWalletConnector;
