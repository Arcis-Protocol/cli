import ora from "ora";
import { type Address } from "viem";
import { getPublicClient, getWalletClient, getAddresses, VAULT_ABI, ERC20_ABI } from "../client.js";
import * as ui from "../ui.js";

export async function vaultStatus() {
  const spinner = ora({ text: ui.ivoryMuted("Querying vault..."), color: "yellow" }).start();

  try {
    const client = getPublicClient();
    const addr = getAddresses();

    const [totalAssets, totalSupply, rate, cap, remaining, reserve, deployed, paused] = await Promise.all([
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "totalAssets" }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "totalSupply" }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "exchangeRate" }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "depositCap" }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "remainingCapacity" }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "reserveBalance" }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "deployedBalance" }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "paused" }),
    ]);

    spinner.stop();

    const util = cap > 0n ? Number(totalAssets * 10000n / cap) / 100 : 0;
    const resPct = totalAssets > 0n ? Number(reserve * 10000n / totalAssets) / 100 : 0;

    ui.heading("VAULT STATUS");
    ui.kv("Status", paused ? "⏸  PAUSED" : "●  ACTIVE", paused ? ui.red : ui.green);
    ui.kv("Network", "Base Mainnet (8453)", ui.ivoryMuted);
    ui.kv("Contract", ui.fmtAddr(addr.vault), ui.goldDim);
    ui.spacer();
    ui.kv("Total Value Locked", ui.fmtUSDC(totalAssets), ui.gold);
    ui.kv("raUSDC Supply", (Number(totalSupply) / 1e6).toLocaleString("en-US", {maximumFractionDigits: 2}) + " raUSDC", ui.ivory);
    ui.kv("Exchange Rate", totalSupply > 0n ? ui.fmtRate(rate) : "1.000000", ui.ivory);
    ui.spacer();
    ui.kv("Reserve (Liquid)", ui.fmtUSDC(reserve) + ` (${resPct.toFixed(1)}%)`, ui.blue);
    ui.kv("Deployed (Yield)", ui.fmtUSDC(deployed) + ` (${(100 - resPct).toFixed(1)}%)`, ui.green);
    ui.spacer();
    if (cap > 0n) {
      ui.kv("Deposit Cap", ui.fmtUSDC(cap), ui.ivoryMuted);
      ui.kv("Remaining", ui.fmtUSDC(remaining), ui.ivoryMuted);
      ui.info("  " + ui.progressBar(util));
    } else {
      ui.kv("Deposit Cap", "No cap set", ui.ivoryMuted);
    }
    ui.sectionEnd();

  } catch (e: any) {
    spinner.fail(ui.red("Failed to fetch vault status"));
    ui.error(e.message);
    ui.sectionEnd();
  }
}

export async function vaultBalance(address: string) {
  const spinner = ora({ text: ui.ivoryMuted("Querying position..."), color: "yellow" }).start();

  try {
    const client = getPublicClient();
    const addr = getAddresses();
    const agent = address as Address;

    const [shares, value, usdcBal] = await Promise.all([
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "balanceOf", args: [agent] }),
      client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "balance", args: [agent] }),
      client.readContract({ address: addr.usdc, abi: ERC20_ABI, functionName: "balanceOf", args: [agent] }),
    ]);

    spinner.stop();

    ui.heading("AGENT POSITION");
    ui.kv("Address", address, ui.goldDim);
    ui.spacer();
    ui.kv("raUSDC Shares", (Number(shares) / 1e6).toLocaleString("en-US", {maximumFractionDigits: 2}), ui.ivory);
    ui.kv("Position Value", ui.fmtUSDC(value), ui.gold);
    ui.kv("USDC Wallet", ui.fmtUSDC(usdcBal), ui.ivory);
    ui.sectionEnd();

  } catch (e: any) {
    spinner.fail(ui.red("Failed to fetch position"));
    ui.error(e.message);
    ui.sectionEnd();
  }
}

export async function vaultDeposit(amount: string, key: string) {
  const amountRaw = BigInt(Math.floor(parseFloat(amount) * 1e6));

  ui.heading("DEPOSIT");
  ui.kv("Amount", `${amount} USDC (${amountRaw.toString()} raw)`, ui.gold);

  const client = getPublicClient();
  const wallet = getWalletClient(key);
  const addr = getAddresses();
  const account = wallet.account!;

  // Check USDC balance
  const spinner1 = ora({ text: ui.ivoryMuted("Checking balance..."), color: "yellow" }).start();
  const usdcBal = await client.readContract({ address: addr.usdc, abi: ERC20_ABI, functionName: "balanceOf", args: [account.address] });
  spinner1.stop();

  if (usdcBal < amountRaw) {
    ui.error(`Insufficient USDC. Have ${ui.fmtUSDC(usdcBal)}, need ${ui.fmtUSDC(amountRaw)}`);
    ui.sectionEnd();
    return;
  }
  ui.kv("USDC Balance", ui.fmtUSDC(usdcBal), ui.green);

  // Preview
  const shares = await client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "previewDeposit", args: [amountRaw] });
  ui.kv("Shares Preview", ui.fmtUSDC(shares) + " raUSDC", ui.ivory);
  ui.spacer();

  // Approve
  const spinner2 = ora({ text: ui.ivoryMuted("Approving USDC..."), color: "yellow" }).start();
  const allowance = await client.readContract({ address: addr.usdc, abi: ERC20_ABI, functionName: "allowance", args: [account.address, addr.vault] });

  if (allowance < amountRaw) {
    const approveTx = await wallet.writeContract({
      address: addr.usdc,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [addr.vault, 2n ** 256n - 1n],
      chain: wallet.chain,
    account: wallet.account!,
    });
    await client.waitForTransactionReceipt({ hash: approveTx });
    spinner2.succeed(ui.ivoryMuted("USDC approved"));
  } else {
    spinner2.succeed(ui.ivoryMuted("Already approved"));
  }

  // Deposit
  const spinner3 = ora({ text: ui.goldBright("Depositing into vault..."), color: "yellow" }).start();
  const tx = await wallet.writeContract({
    address: addr.vault,
    abi: VAULT_ABI,
    functionName: "deposit",
    args: [amountRaw],
    chain: wallet.chain,
    account: wallet.account!,
  });
  const receipt = await client.waitForTransactionReceipt({ hash: tx });
  spinner3.stop();

  ui.success(`Deposited ${amount} USDC`);
  ui.kv("TX Hash", tx, ui.goldDim);
  ui.kv("Block", receipt.blockNumber.toString(), ui.ivoryMuted);
  ui.kv("Gas Used", receipt.gasUsed.toString(), ui.ivoryMuted);
  ui.kv("Explorer", `${addr.explorer}/tx/${tx}`, ui.blue);
  ui.sectionEnd();
}

export async function vaultWithdraw(sharesStr: string, key: string, all = false) {
  const client = getPublicClient();
  const wallet = getWalletClient(key);
  const addr = getAddresses();
  const account = wallet.account!;

  ui.heading("WITHDRAW");

  let shares: bigint;
  if (all) {
    const spinner = ora({ text: ui.ivoryMuted("Fetching position..."), color: "yellow" }).start();
    shares = await client.readContract({ address: addr.vault, abi: VAULT_ABI, functionName: "balanceOf", args: [account.address] });
    spinner.stop();
    if (shares === 0n) {
      ui.error("No shares to withdraw");
      ui.sectionEnd();
      return;
    }
    ui.kv("Withdrawing", "ALL (" + ui.fmtUSDC(shares) + " raUSDC)", ui.gold);
  } else {
    shares = BigInt(Math.floor(parseFloat(sharesStr) * 1e6));
    ui.kv("Shares", ui.fmtUSDC(shares) + " raUSDC", ui.gold);
  }

  const spinner2 = ora({ text: ui.goldBright("Withdrawing from vault..."), color: "yellow" }).start();
  const tx = await wallet.writeContract({
    address: addr.vault,
    abi: VAULT_ABI,
    functionName: "withdraw",
    args: [shares],
    chain: wallet.chain,
    account: wallet.account!,
  });
  const receipt = await client.waitForTransactionReceipt({ hash: tx });
  spinner2.stop();

  ui.success(`Withdrew ${ui.fmtUSDC(shares)} raUSDC`);
  ui.kv("TX Hash", tx, ui.goldDim);
  ui.kv("Block", receipt.blockNumber.toString(), ui.ivoryMuted);
  ui.kv("Explorer", `${addr.explorer}/tx/${tx}`, ui.blue);
  ui.sectionEnd();
}
