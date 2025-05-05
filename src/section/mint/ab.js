
export const publicMintABI = {
    "inputs": [{
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "_mintAmount",
        "type": "uint256"
    }],
    "name": "publicMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
};

export const mintPriceABI = {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "_price",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
};

export const maxMintPerAddressABI = {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "_maxMintPerAddress",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
};

export const maxSupplyABI = {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "_maxSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
};

export const mintedNFTsAbi = {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "_minted",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
};

export const whitelistMintLuckyListABI = {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_mintAmount",
            "type": "uint256"
        },
        {
            "internalType": "bytes32[]",
            "name": "_merkleProof",
            "type": "bytes32[]"
        }
    ],
    "name": "whitelistMintLuckyList",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
};

export const whitelistMintGenesisABI = {"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"whitelistMintGenesis","outputs":[],"stateMutability":"payable","type":"function"}

export const whitelistMintOGsABI = {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_mintAmount",
            "type": "uint256"
        },
        {
            "internalType": "bytes32[]",
            "name": "_merkleProof",
            "type": "bytes32[]"
        }
    ],
    "name": "whitelistMintOGs",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
};
