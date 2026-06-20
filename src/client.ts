import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
  type PublicClient,
  type WalletClient,
  type Address,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

// ── Chain Definitions ──
export const baseSepolia = defineChain({
  id: 84532,
  name: "Base Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://sepolia.base.org"] } },
  blockExplorers: { default: { name: "Blockscout", url: "https://base-sepolia.blockscout.com" } },
});

export const base = defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://mainnet.base.org"] } },
  blockExplorers: { default: { name: "BaseScan", url: "https://basescan.org" } },
});

// ── Addresses ──
export const ADDRESSES = {
  testnet: {
    vault: "0xa8eF658E125C7f6D7aFa9B6b8035b66b32CBE98d" as Address,
    credit: "0x019540E33a0292a9DDE36bD9Ef11774d5A1Ce6FC" as Address,
    router: "0x0281e7D37683c585325004F84e0b94170c78d5B4" as Address,
    usdc: "0x29440A12f15fe6bDf5F624f4eeEB298CCb782f05" as Address,
    explorer: "https://base-sepolia.blockscout.com",
  },
};

// ── ABIs ──
export const VAULT_ABI = [
  { name: "deposit", type: "function", inputs: [{ name: "amount", type: "uint256" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "nonpayable" },
  { name: "withdraw", type: "function", inputs: [{ name: "shares", type: "uint256" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "nonpayable" },
  { name: "balance", type: "function", inputs: [{ name: "agent", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "totalAssets", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "totalSupply", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "exchangeRate", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "depositCap", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "remainingCapacity", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "reserveBalance", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "deployedBalance", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "paused", type: "function", inputs: [], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
  { name: "previewDeposit", type: "function", inputs: [{ name: "assets", type: "uint256" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
] as const;

export const CREDIT_ABI = [
  { name: "lendingPool", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "totalBorrowed", type: "function", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "collateralRatios", type: "function", inputs: [{ name: "tier", type: "uint256" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "totalOwed", type: "function", inputs: [{ name: "loanId", type: "uint256" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "isHealthy", type: "function", inputs: [{ name: "loanId", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
] as const;

export const ERC20_ABI = [
  { name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
  { name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "allowance", type: "function", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
] as const;

// ── Client Factory ──
export function getPublicClient(): PublicClient {
  return createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
}

export function getWalletClient(privateKey: string): WalletClient {
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  return createWalletClient({
    chain: baseSepolia,
    transport: http(),
    account,
  });
}

export function getAddresses() {
  return ADDRESSES.testnet;
}
