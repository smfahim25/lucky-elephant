// Import your existing ABIs
import pnutContract from './pnut';
import LECContract from './LEC'; // 3D NFT contract
import mintedContractAbi from './mint'; // 3D Mint ABI
import whiteListedUser from './whiteList';

// Import the new 2D collection ABI with a unique name
import twoDMintAbi from './2dMint'; // Ensure 2dMint.json exists in your contract folder

// Contract addresses
export const pnutContractAddress = '0xd6eb4830f5c278E017c0F0aab59c7a51140Ec7EF'; // Existing PNUT contract
export const lecNftContractAddress = '0x42de23cc51A8425C248C9801395DD47BD1996152'; // 3D collection
export const mintedContractAddress = '0x42de23cc51A8425C248C9801395DD47BD1996152'; // 3D mint contract

// Add the 2D collection contract address
export const lec2DNftContractAddress = '0xeaa5e2f2c7d1fdccc763af70fd73a01e860de2d2'; // 2D collection

// Chain configuration
export const CHAIN_ID = 1; // Ethereum Mainnet

// Export ABIs for use across the project
export const pnutAbi = pnutContract;
export const mintAbi = mintedContractAbi; // 3D mint ABI
export const LECNFTAbi = LECContract; // 3D NFT contract ABI

// Export the new 2D mint ABI with its unique name
export const mint2dAbi = twoDMintAbi; // No more conflicts

export const whiteListedData = whiteListedUser;
