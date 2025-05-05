// src/hooks/query.jsx

import { useQuery } from "@tanstack/react-query";
// import { useAccounts, useAddress } from "@thirdweb-dev/react"; // if not used, leave commented
import { initializeHelper } from "@/src/utils/alchemyHelper"; // your Alchemy-based helper
import { collectionNames, queryKeys, salesMode } from "./queryContants";
import { useGlobalStates } from "../store/useGlobalStates";
import {
  parseEther,
  formatEther,
  // JsonRpcProvider,
  // Contract
} from "ethers";
import axios from "axios";
// import { useModal } from "../utils/ModalContext"; // if used, uncomment

/***********************************************************************
 * NOTES:
 *  - We removed direct Moralis calls (like Moralis.EvmApi.nft).
 *  - If you want to fetch NFTs via Alchemy, you can call your
 *    `/api/user-nfts?address=${address}` route or alchemyEvm directly.
 *  - Ethers v6 usage: we import parseEther, formatEther, etc. directly.
 ***********************************************************************/

/**********************************************************************
 * EXAMPLE QUERIES FOR YOUR ETHEREUM (3D) COLLECTION MINTING
 * These can line up with the same contract calls you do in Mint.jsx.
 **********************************************************************/

/** Query #1: Get total supply from your NFT contract */
export const useQueryGetTotalSupply = () => {
  const { LECNFT_CONTRACT, address } = useGlobalStates((state) => state.contract);

  const queryKey = [queryKeys.getTotalSupply, address];
  const queryFn = async () => {
    // Initialize your Alchemy/Ethers helper
    await initializeHelper();

    if (!LECNFT_CONTRACT) {
      console.log("LECNFT_CONTRACT is undefined.");
      return "0";
    }
    // Suppose your contract function is `totalSupply()` 
    const supply = await LECNFT_CONTRACT.totalSupply();
    return supply.toString();
  };

  return useQuery({
    queryKey,
    queryFn,
    // Only run if contract & address exist
    enabled: !!address && !!LECNFT_CONTRACT,
    onError: (error) => {
      console.error(error);
    },
  });
};

/** Query #2: Get NFTs Owned by the user (balanceOf) */
export const useQueryGetNFTsOwned = () => {
  const { LECNFT_CONTRACT, address } = useGlobalStates((state) => state.contract);

  const queryKey = [queryKeys.getNFTsOwned, address];
  const queryFn = async () => {
    await initializeHelper();

    if (!LECNFT_CONTRACT || !address) {
      console.log("LECNFT_CONTRACT or address is undefined.");
      return "0";
    }
    try {
      // E.g. your contract might do: `balanceOf(address)`
      const balance = await LECNFT_CONTRACT.balanceOf(address);
      return balance.toString();
    } catch (err) {
      console.error("Error fetching NFT balance:", err);
      return "0";
    }
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!LECNFT_CONTRACT,
    onError: (err) => console.error(err),
  });
};

/**********************************************************************
 * COINGECKO OR OTHER EXTERNAL API
 **********************************************************************/

/** Query #3: Get PNUT token price from Coingecko */
export const useQueryPNUTTokenPrice = () => {
  const { address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getPNUTTokenPrice, address];

  const queryFn = async () => {
    const response = await axios(
      "https://api.coingecko.com/api/v3/simple/price?ids=pnut&vs_currencies=usd"
    );
    return response.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address,
    onError: (err) => console.error(err),
  });
};

/**********************************************************************
 * EXAMPLE: GET WALLET NFTs (IF YOU WANT TO USE ALCHEMY INSTEAD OF MORALIS)
 **********************************************************************/

/** Query #4: All NFTs list for the user’s wallet */
export const useQueryAllNftsList = () => {
  const { address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getUserWalletNfts, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!address) {
      console.log("No wallet connected, skipping NFT fetch.");
      return [];
    }

    // If you want to use your custom route or Alchemy directly, e.g.:
    // const resp = await fetch(`/api/user-nfts?address=${address}`);
    // const data = await resp.json();
    // return data.nfts || [];

    // Return empty array for now:
    return [];
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address,
    select: (res) => {
      // If res has metadata, you can parse it. For now, return raw res.
      return res;
    },
    onError: (err) => console.error(err),
  });
};

/**********************************************************************
 * PNUT CONTRACT QUERIES (IF RELEVANT)
 **********************************************************************/

/** Query #5: PNUT Contract Balance */
export const useQueryGetContractBalance = () => {
  const { PNUT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getContractBalance, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!PNUT_CONTRACT || !address) {
      console.log("PNUT_CONTRACT or address is undefined.");
      return "0";
    }
    const tx = await PNUT_CONTRACT.balanceOf(address);
    return tx.toString();
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!PNUT_CONTRACT,
    select: (res) => res.toString(),
    onError: (err) => console.error(err),
  });
};

/** Query #6: Get Claimable $PNUT */
export const useQueryGetClaimPrice = () => {
  const { PNUT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getClaimPrice, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!PNUT_CONTRACT || !address) {
      console.log("PNUT_CONTRACT or address is undefined.");
      return "0";
    }
    const tx = await PNUT_CONTRACT.getTotalClaimable(address);
    return formatEther(tx.toString());
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!PNUT_CONTRACT,
    onError: (err) => console.error(err),
  });
};

/** Query #7: Daily Earnings from PNUT contract */
export const useQueryGetDailyEarning = () => {
  const { PNUT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getDailyEarning, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!PNUT_CONTRACT || !address) {
      console.log("PNUT_CONTRACT or address is undefined.");
      return "0";
    }
    const tx = await PNUT_CONTRACT.getDailyEarnings(address);
    return formatEther(tx.toString());
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!PNUT_CONTRACT,
    select: (res) => res, // Already in "ETH" decimal
    onError: (err) => console.error(err),
  });
};

/** Query #8: Total Rewards from PNUT contract */
export const useQueryGetTotalRewards = () => {
  const { PNUT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getTotalRewards, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!PNUT_CONTRACT || !address) {
      console.log("PNUT_CONTRACT or address is undefined.");
      return "0";
    }
    const tx = await PNUT_CONTRACT.rewards(address);
    return tx?.toString();
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!PNUT_CONTRACT,
    select: (res) => formatEther(res.toString()),
    onError: (err) => console.error(err),
  });
};

/**********************************************************************
 * MINTING PAGE QUERIES (Similar to Mint.jsx usage)
 **********************************************************************/

/** Query #9: Already minted amount */
export const useQueryGetMinted = () => {
  const { MINT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getMinted, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!MINT_CONTRACT || !address) {
      console.log("MINT_CONTRACT or address is undefined.");
      return "0";
    }
    // e.g. MINT_CONTRACT._minted(salesMode)
    const minted = await MINT_CONTRACT._minted(salesMode);
    return minted?.toString();
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!MINT_CONTRACT,
    onError: (err) => console.error(err),
  });
};

/** Query #10: Mint Price for the current salesMode */
export const useQueryGet_Price = () => {
  const { MINT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getPrice, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!MINT_CONTRACT || !address) {
      console.log("MINT_CONTRACT or address is undefined.");
      return "0";
    }
    const priceWei = await MINT_CONTRACT._price(salesMode);
    // If you need the numeric value in ETH
    return formatEther(priceWei.toString());
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!MINT_CONTRACT,
    onError: (err) => console.error(err),
  });
};

/** Query #11: Max Supply for the current salesMode */
export const useQuery_MaxSupply = () => {
  const { MINT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getMaxSupply, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!MINT_CONTRACT || !address) {
      console.log("MINT_CONTRACT or address is undefined.");
      return "0";
    }
    const supply = await MINT_CONTRACT._maxSupply(salesMode);
    return supply?.toString();
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!MINT_CONTRACT,
    onError: (err) => console.error(err),
  });
};

/** Query #12: Max Mint per Address for the current salesMode */
export const useQuery_MaxMintPerAddress = () => {
  const { MINT_CONTRACT, address } = useGlobalStates((state) => state.contract);
  const queryKey = [queryKeys.getMAX_MintPerAddress, address];

  const queryFn = async () => {
    await initializeHelper();

    if (!MINT_CONTRACT || !address) {
      console.log("MINT_CONTRACT or address is undefined.");
      return "0";
    }
    const maxMint = await MINT_CONTRACT._maxMintPerAddress(salesMode);
    return maxMint.toString();
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!address && !!MINT_CONTRACT,
    onError: (err) => console.error(err),
  });
};
