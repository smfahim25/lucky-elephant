import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useGlobalStates } from '../store/useGlobalStates';
import { whiteListedData } from '../contract';
import { parseEther } from 'viem';



// =================================== Create nft Collection =================================

export const useMutateMintOGs = () => {

  const { MINT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const mutationFn = async ({ mintQuantity, mintPrice }) => {
    const address1 = '0x32e3516Dd27f67BA73d06aa4C07F8dAB552F7599'
    const whiteTransactions = whiteListedData[address1]

    const value = parseEther((parseFloat(mintPrice) * parseInt(mintQuantity)).toFixed(2))
    const tx = await MINT_CONTRACT.whitelistMintOGs(1, whiteTransactions, { value });
    return tx;
  };

  return useMutation({
    mutationFn,
    enabled: !!address && !!MINT_CONTRACT,
    onError: (res) => {
      toast.error(`error ${res}`);
    },
    onSuccess: (res) => {
      toast(`${res?.status}`);
    },
  });
};
