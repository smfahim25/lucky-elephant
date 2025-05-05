export const publicMintABI2D = {
    inputs: [
      { internalType: "address", name: "_recipient", type: "address" },
      { internalType: "uint256", name: "_mintAmount", type: "uint256" },
    ],
    name: "publicMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  };
  
  export const mintPriceABI2D = {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "_price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  };
  
  export const maxMintPerAddressABI2D = {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "_maxMintPerAddress",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  };
  
  export const maxSupplyABI2D = {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "_maxSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  };
  
  export const mintedNFTsAbi2D = {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "_minted",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  };
  
  export const whitelistMintLuckyListABI2D = {
    inputs: [
      { internalType: "uint256", name: "_mintAmount", type: "uint256" },
      { internalType: "bytes32[]", name: "_merkleProof", type: "bytes32[]" },
    ],
    name: "whitelistMintLuckyList",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  };
  