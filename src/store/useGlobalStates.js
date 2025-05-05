import { create } from 'zustand';

export const useGlobalStates = create((set) => ({

  contract: {
    LECNFT_CONTRACT: null,
    PNUT_CONTRACT: null,
    MINT_CONTRACT:null,
    chainId: null,
    address: null,
  },

  contactDetails: (abis) =>
    set({
      contract: abis,
    }),
}));
