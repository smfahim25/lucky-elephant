// config/wagmiConfig.ts
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createStorage, cookieStorage } from "wagmi";
import { mainnet } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("Missing env var: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
}

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks: [mainnet], // only Ethereum mainnet
  storage: createStorage({ storage: cookieStorage }),
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
