import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL } from "./idl";
import { clusterApiUrl, Connection, PublicKey, Transaction } from "@solana/web3.js";
import { utils } from '@coral-xyz/anchor'
import {
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  transfer,
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync
  // @ts-ignore
} from "@solana/spl-token";
import {
  MPL_TOKEN_METADATA_PROGRAM_ID
} from "@metaplex-foundation/mpl-token-metadata";
import {Metaplex, Pda} from "@metaplex-foundation/js";
import * as anchor from '@coral-xyz/anchor';
import { program, stakeDetails, getRecordCustodyVault, nftAuthority, tokenAuthority } from './setup';
import { AnchorWallet } from "@solana/wallet-adapter-react";


// window.Buffer = Buffer;

export const programId = new PublicKey('2H8tRvE4nxgfjncxjUXygqD34skeR5AziTQdxsjrTbQi') ;

export const ownerPublicKey = new PublicKey("GeTHGKMyKwcr5LWqM645uC4pZLEBhAfm4QGw9o5RSBjk");

export const tokenMint = new PublicKey("AgsRWgGeCfwJvVukEVNW7AA3uWAUzLYNe7qEwHCSdGPQ"); // Mint of the Token to be given as reward


export const stakeTransaction = async (
    wallet: AnchorWallet,
    nftMint: PublicKey,
    nftToken: PublicKey,
    nftMetadata: PublicKey,
    nftEdition: PublicKey
    ) => {

      const {nftCustody, nftRecord, stakeTokenVault} = await getRecordCustodyVault(nftMint);

      // @ts-ignore
      const tx: Transaction = await program.methods.stake().accounts({
        stakeDetails,
        nftRecord,
        nftMint,
        nftToken,
        nftMetadata,
        nftAuthority,
        nftEdition,
        nftCustody,
        // self provided
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        signer: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID
    }
    ).transaction()

    return tx
}


export const unStakeTransaction = async (
    wallet: AnchorWallet,
    nftMint: PublicKey,
    nftToken: PublicKey
    ) => {

      const {nftCustody, nftRecord, stakeTokenVault} = await getRecordCustodyVault(nftMint);

      const myATA = await findATA(wallet.publicKey)

      // @ts-ignore
      const tx: Transaction = await program.methods.unstake().accounts({
        stakeDetails,
        nftRecord,
        nftMint,
        nftAuthority,
        nftCustody,
        rewardMint: tokenMint,
        tokenAuthority,
        nftReceiveAccount: nftToken,
        rewardReceiveAccount: myATA,
        stakeTokenVault,
        // self provided
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        staker: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID
    }
    ).transaction()

    return tx
}

export const addBlockhash = async (tx: Transaction, connection: Connection) => {
    let blockhashh = (await connection.getLatestBlockhash('finalized')).blockhash;
    tx.recentBlockhash = blockhashh;
    return tx
}

export const addPayer = async (tx: Transaction, publicKey: PublicKey) => {
    tx.feePayer = publicKey;
    return tx
}

export const findATA = async (owner: PublicKey, mint?: PublicKey) => {

    const ata = await getAssociatedTokenAddress(
        mint ? mint : tokenMint,
        owner
    );

    return ata;

}