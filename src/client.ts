import { createPublicClient, createWalletClient, http, defineChain, type Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const baseSepolia = defineChain({
  id: 84532, name: "Base Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://sepolia.base.org"] } },
  blockExplorers: { default: { name: "Blockscout", url: "https://base-sepolia.blockscout.com" } },
});

const ADDRESSES = {
  vault: "0xa8eF658E125C7f6D7aFa9B6b8035b66b32CBE98d" as Address,
  credit: "0x019540E33a0292a9DDE36bD9Ef11774d5A1Ce6FC" as Address,
  router: "0x0281e7D37683c585325004F84e0b94170c78d5B4" as Address,
  usdc: "0x29440A12f15fe6bDf5F624f4eeEB298CCb782f05" as Address,
  allocator: "0x9f101e1159AA530dC5Cb104decB32aBA1eAF2617" as Address,
  bondFactory: null as Address | null,
  explorer: "https://base-sepolia.blockscout.com",
};

export const VAULT_ABI = [
  { name: "totalAssets", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "totalSupply", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "exchangeRate", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "depositCap", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "remainingCapacity", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "reserveBalance", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "deployedBalance", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "paused", type: "function", inputs: [], outputs: [{ type: "bool" }], stateMutability: "view" },
  { name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "balance", type: "function", inputs: [{ name: "agent", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "previewDeposit", type: "function", inputs: [{ name: "assets", type: "uint256" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "asset", type: "function", inputs: [], outputs: [{ type: "address" }], stateMutability: "view" },
  { name: "maxDeposit", type: "function", inputs: [{ name: "agent", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "deposit", type: "function", inputs: [{ name: "amount", type: "uint256" }], outputs: [{ type: "uint256" }], stateMutability: "nonpayable" },
  { name: "withdraw", type: "function", inputs: [{ name: "shares", type: "uint256" }], outputs: [{ type: "uint256" }], stateMutability: "nonpayable" },
] as const;

export const CREDIT_ABI = [
  { name: "lendingPool", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "totalBorrowed", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "baseRateBps", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "loanCount", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "collateralRatios", type: "function", inputs: [{ name: "", type: "uint256" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "totalOwed", type: "function", inputs: [{ name: "loanId", type: "uint256" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "isHealthy", type: "function", inputs: [{ name: "loanId", type: "uint256" }], outputs: [{ type: "bool" }], stateMutability: "view" },
] as const;

export const BOND_ABI = [
  { name: "bondCount", type: "function", inputs: [], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "paused", type: "function", inputs: [], outputs: [{ type: "bool" }], stateMutability: "view" },
  { name: "escrowBalances", type: "function", inputs: [{ name: "bondId", type: "uint256" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
] as const;

export const ERC20_ABI = [
  { name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "allowance", type: "function", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ type: "uint256" }], stateMutability: "view" },
  { name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ type: "bool" }], stateMutability: "nonpayable" },
] as const;

export function getPublicClient() {
  return createPublicClient({ chain: baseSepolia, transport: http() });
}

export function getWalletClient(privateKey: string) {
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  return createWalletClient({ chain: baseSepolia, transport: http(), account });
}

export function getAddresses() {
  return ADDRESSES;
}
