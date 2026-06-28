import { createPublicClient, createWalletClient, http, defineChain, type Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const baseSepolia = defineChain({
  id: 8453, name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://mainnet.base.org"] } },
  blockExplorers: { default: { name: "Blockscout", url: "https://basescan.org" } },
});

const ADDRESSES = {
  vault: "0x00325d9da832b38179ed2f0dabd4062d93e325a7" as Address,
  credit: "0xdf31800e620f728297340d66acf5a306f07ce7a1" as Address,
  router: "0xeC3b7Daa942C03651D55A4A01797498fA6dB728F" as Address,
  usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address,
  allocator: "0x7Fd5d7b49694858FCf143E0039e83cDB0196DD7A" as Address,
  bondFactory: null as Address | null,
  explorer: "https://basescan.org",
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
