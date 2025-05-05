import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";
// window.Buffer = Buffer;
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";

import {Metaplex} from "@metaplex-foundation/js";

export type NFTType = { metadata: PublicKey; nftMint: PublicKey; nftToken: PublicKey; edition: PublicKey; nftCustody: any; nftRecord: PublicKey; stakeTokenVault: any; details: any }


const utf8Encode = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

// @ts-ignore
import Moralis from 'moralis';
import axios from "axios";
import { findATA } from "./transactionBuilder";


const programId = new PublicKey("2H8tRvE4nxgfjncxjUXygqD34skeR5AziTQdxsjrTbQi");
const ownerPublicKey = new PublicKey("GeTHGKMyKwcr5LWqM645uC4pZLEBhAfm4QGw9o5RSBjk");
const collectionAddress = new PublicKey("GfvCGwrGQch2vegUXZkQm7up1N1jomwmLx6H5VQ92zTh"); // Mint Address of the Collection NFT for which the staking to be activated
const tokenMint = new PublicKey("AgsRWgGeCfwJvVukEVNW7AA3uWAUzLYNe7qEwHCSdGPQ");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<any>(IDL, programId, {
  // @ts-ignore
  connection,
});

// 0.00011574 PBUTTA

// PDAs
export const [stakeDetails] = PublicKey.findProgramAddressSync([
  utf8Encode("stake"),
  collectionAddress.toBytes(),
  ownerPublicKey.toBytes()
], programId);

// u can use wallet.publicKey instead of program.provider.publicKey, it shows which wallet is being used to interact with the Solana program

export const [tokenAuthority] = PublicKey.findProgramAddressSync([
  utf8Encode("token-authority"),
  stakeDetails.toBytes()
], programId);

export const [nftAuthority] = PublicKey.findProgramAddressSync([
  utf8Encode("nft-authority"),
  stakeDetails.toBytes()
], programId);

export const getRecordCustodyVault = async (nftMint: PublicKey) => {

  const [nftRecord] = PublicKey.findProgramAddressSync([
    utf8Encode("nft-record"),
    stakeDetails.toBytes(),
    nftMint.toBytes()
  ], programId);

  const nftCustody = getAssociatedTokenAddressSync(nftMint, nftAuthority, true);
  const stakeTokenVault = getAssociatedTokenAddressSync(tokenMint, tokenAuthority, true);

  return { nftRecord, nftCustody, stakeTokenVault }
}


// Derive a PDA for the counter account, using "counter" as the seed.
// We'll use this to update the counter on-chain.
export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("ecom4")],
  program.programId
);

// Define a TypeScript type for the Counter data structure based on the IDL.
// This ensures type safety when interacting with the "counter" account, facilitating development and maintenance.
// @ts-ignore
export type CounterData = IdlAccounts<HelloAnchor>["accountStruct"];
// @ts-ignore
export type StakeDetails = IdlAccounts<NftStakeVault>["details"];
// @ts-ignore
export type NFTRecord = IdlAccounts<NFTRecord>["nftRecord"];

export const getStakeDetails = async () => {
    // @ts-ignore
  const data:StakeDetails = await program.account.details.fetch(stakeDetails)
  return data;

}

export const getNFTRecord = async (nftMint: PublicKey) => {
  const {nftRecord} = await getRecordCustodyVault(nftMint)
  // @ts-ignore
  const data:NFTRecord = await program.account.details.fetch(nftRecord)
  return data;
}


export const getNumberOfNFTs = async (account: PublicKey) => {

          try {
            await Moralis.start({
              apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjgzMDgxNmY3LWRjMDQtNGVkYy1hODllLTk4ZDlhZTYxNWJhOSIsIm9yZ0lkIjoiMTY2NTAyIiwidXNlcklkIjoiMTY2MTczIiwidHlwZUlkIjoiOTQ4MjljYmYtMDQ3MS00NjEzLTkzZWEtNjYyZTBiNjY3NzE1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDAzNDczNTQsImV4cCI6NDg1NjEwNzM1NH0.mP93XVR2D91Z2Bvro5Tc1MD2SYBnSeM3vCE8QRdPOXU"
            });
          } catch (error) {
            console.log('Moralis already started.');
          }

          const ids = [];

          const response = await Moralis.SolApi.account.getNFTs({
            "address": account.toString(),
            "network": "devnet"
          });

          const allNFTs = response.raw;
          for (let i = 0; i < allNFTs.length; i++) {
            if(allNFTs[i].symbol === 'NXW') {
              ids.push(allNFTs[i]);
            }
          }

          return ids.length;

}

export const myNfts = async (account: PublicKey) => {

          async function findEditionAddress(mint: PublicKey): Promise<PublicKey> {
            const editionPDA = await PublicKey.findProgramAddress(
              [
                Buffer.from("metadata"),
                (new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)).toBuffer(),
                mint.toBuffer(),
                Buffer.from("edition"),
              ],
              (new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID))
            );
          
            return editionPDA[0];
          }

          // @ts-ignore
          const metaplex = Metaplex.make(connection);

          const tokenAccountss = await connection.getParsedTokenAccountsByOwner(
            account,
            { 
              programId: TOKEN_PROGRAM_ID
            }
          );

          try {
            await Moralis.start({
              apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjgzMDgxNmY3LWRjMDQtNGVkYy1hODllLTk4ZDlhZTYxNWJhOSIsIm9yZ0lkIjoiMTY2NTAyIiwidXNlcklkIjoiMTY2MTczIiwidHlwZUlkIjoiOTQ4MjljYmYtMDQ3MS00NjEzLTkzZWEtNjYyZTBiNjY3NzE1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDAzNDczNTQsImV4cCI6NDg1NjEwNzM1NH0.mP93XVR2D91Z2Bvro5Tc1MD2SYBnSeM3vCE8QRdPOXU"
            });
          } catch (error) {
            console.log('Moralis already started.');
          }

          const ids = [];
          const fullNfts: any[] = [];
          const response = await Moralis.SolApi.account.getNFTs({
            "address": account.toString(),
            "network": "devnet"
          });

          const allNFTs = response.raw;
          
          for (let i = 0; i < allNFTs.length; i++) {
            if(
              // allNFTs[i].symbol === 'NXW'
              // true
              allNFTs[i].name.includes('Lil Elly Degens #')
            ) {
              ids.push(allNFTs[i]);
            }
          }

          console.log(ids);
          return ids
}

export const myNftsbyIds = async (account: PublicKey, ids: PublicKey[]) => {

  try {
    await Moralis.start({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjgzMDgxNmY3LWRjMDQtNGVkYy1hODllLTk4ZDlhZTYxNWJhOSIsIm9yZ0lkIjoiMTY2NTAyIiwidXNlcklkIjoiMTY2MTczIiwidHlwZUlkIjoiOTQ4MjljYmYtMDQ3MS00NjEzLTkzZWEtNjYyZTBiNjY3NzE1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDAzNDczNTQsImV4cCI6NDg1NjEwNzM1NH0.mP93XVR2D91Z2Bvro5Tc1MD2SYBnSeM3vCE8QRdPOXU"
    });
  } catch (error) {
    console.log('Moralis already started.');
  }

  const fullNfts: any[] = [];

  for (let i = 0; i < ids.length; i++) {

      const response2 = await Moralis.SolApi.nft.getNFTMetadata({
        "network": "devnet",
        "address": ids[i].toString()
      })

      const nftAccount = await findATA(account, ids[i])

      const loadMeta = await axios.get(response2.raw.metaplex.metadataUri)
      fullNfts.push({
        ...response2.raw,
        details: loadMeta.data,
        nftMint: ids[i],
        nftToken: nftAccount
      })
    
  }
  return fullNfts;
}