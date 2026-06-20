#!/usr/bin/env node

import { Command } from "commander";
import { banner } from "./ui.js";
import { vaultStatus, vaultBalance, vaultDeposit, vaultWithdraw } from "./commands/vault.js";
import { creditStatus, creditTiers, creditHealth } from "./commands/credit.js";
import { showContracts } from "./commands/config.js";

const program = new Command();

program
  .name("arcis")
  .description("Arcis Protocol CLI — interact with agent vaults from your terminal")
  .version("0.1.0")
  .hook("preAction", () => banner());

// ── Vault Commands ──
const vault = program.command("vault").description("Agent vault operations");

vault
  .command("status")
  .description("Show vault TVL, exchange rate, capacity, and reserve/deployed split")
  .action(vaultStatus);

vault
  .command("balance <address>")
  .description("Check an agent's vault position (shares, value, USDC wallet)")
  .action(vaultBalance);

vault
  .command("deposit <amount>")
  .description("Deposit USDC into the vault")
  .requiredOption("-k, --key <privateKey>", "Agent private key (0x...)")
  .action((amount, opts) => vaultDeposit(amount, opts.key));

vault
  .command("withdraw [shares]")
  .description("Withdraw USDC by redeeming raUSDC shares")
  .option("-k, --key <privateKey>", "Agent private key (0x...)")
  .option("-a, --all", "Withdraw entire position")
  .action((shares, opts) => {
    if (!opts.key) {
      console.error("  Error: --key is required for withdrawals");
      process.exit(1);
    }
    vaultWithdraw(shares || "0", opts.key, opts.all || false);
  });

// ── Credit Commands ──
const credit = program.command("credit").description("Agent credit module");

credit
  .command("status")
  .description("Show lending pool, total borrowed, and utilization")
  .action(creditStatus);

credit
  .command("tiers")
  .description("Show ERC-8004 reputation tier collateral ratios")
  .action(creditTiers);

credit
  .command("health <loanId>")
  .description("Check the health of a specific loan")
  .action(creditHealth);

// ── Info Commands ──
program
  .command("contracts")
  .description("Show deployed contract addresses and ATI spec")
  .action(function() {
    showContracts();
  });

program
  .command("status")
  .description("Full protocol overview — vault + credit in one view")
  .action(async () => {
    await vaultStatus();
    await creditStatus();
  });

program.parse();
