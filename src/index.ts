#!/usr/bin/env node

import { Command } from "commander";
import { banner } from "./ui.js";
import { vaultStatus, vaultBalance, vaultDeposit, vaultWithdraw } from "./commands/vault.js";
import { creditStatus, creditTiers, creditHealth } from "./commands/credit.js";
import { bondStatus } from "./commands/bonds.js";
import { showContracts } from "./commands/config.js";
import { showMcp, showCustos, showSdk, showToken } from "./commands/info.js";

const program = new Command();

program
  .name("arcis")
  .description("Arcis Protocol CLI — the citadel from your terminal")
  .version("1.0.0")
  .hook("preAction", () => banner());

// ── Full Status ──
program
  .command("status")
  .description("Full protocol overview — vault + credit + bonds")
  .action(async () => {
    await vaultStatus();
    await creditStatus();
    await bondStatus();
  });

// ── Vault ──
const vault = program.command("vault").description("Agent vault operations");

vault.command("status")
  .description("Vault TVL, exchange rate, capacity, reserve/deployed")
  .action(vaultStatus);

vault.command("balance <address>")
  .description("Agent position — shares, value, USDC wallet")
  .action(vaultBalance);

vault.command("deposit <amount>")
  .description("Deposit USDC into the vault")
  .requiredOption("-k, --key <privateKey>", "Agent private key (0x...)")
  .action((amount, opts) => vaultDeposit(amount, opts.key));

vault.command("withdraw [shares]")
  .description("Withdraw by redeeming raUSDC shares")
  .option("-k, --key <privateKey>", "Agent private key (0x...)")
  .option("-a, --all", "Withdraw entire position")
  .action((shares, opts) => {
    if (!opts.key) { console.error("  Error: --key is required"); process.exit(1); }
    vaultWithdraw(shares || "0", opts.key, opts.all || false);
  });

// ── Credit ──
const credit = program.command("credit").description("Agent credit module");

credit.command("status")
  .description("Lending pool, total borrowed, utilization")
  .action(creditStatus);

credit.command("tiers")
  .description("ERC-8004 reputation tier table")
  .action(creditTiers);

credit.command("health <loanId>")
  .description("Check loan health and total owed")
  .action(creditHealth);

// ── Bonds ──
program.command("bonds")
  .description("Revenue bond status")
  .action(bondStatus);

// ── Info ──
program.command("contracts")
  .description("Deployed contract addresses + ATI spec")
  .action(showContracts);

program.command("mcp")
  .description("MCP server setup — connect AI agents to Arcis")
  .action(showMcp);

program.command("custos")
  .description("CUSTOS keeper agent — autonomous protocol maintenance")
  .action(showCustos);

program.command("sdk")
  .description("TypeScript SDK — @arcisprotocol/sdk")
  .action(showSdk);

program
  .command("token")
  .description("$CUSTOS token info — contract, links, Virtuals")
  .action(showToken);

program.parse();
