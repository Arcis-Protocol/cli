import * as ui from "../ui.js";

export function showMcp() {
  ui.heading("MCP SERVER");
  ui.info("Connect any AI agent to Arcis in one tool call.");
  ui.spacer();

  ui.kv("npm", "@arcisprotocol/mcp", ui.gold);
  ui.kv("Version", "0.2.0", ui.ivory);
  ui.kv("Tools", "9 (7 read + 2 write)", ui.ivory);
  ui.spacer();

  ui.info(ui.goldBright("Local (Claude Desktop / Claude Code):").toString());
  ui.code([
    '{',
    '  "mcpServers": {',
    '    "arcis": {',
    '      "command": "npx",',
    '      "args": ["@arcisprotocol/mcp"]',
    '    }',
    '  }',
    '}',
  ]);
  ui.spacer();

  ui.info(ui.goldBright("Remote (Claude.ai Custom Connector):").toString());
  ui.code([
    "Deploy: vercel.com/new → import Arcis-Protocol/mcp",
    "URL:    https://your-project.vercel.app/api/mcp",
  ]);
  ui.spacer();

  ui.info(ui.goldBright("Self-Hosted:").toString());
  ui.code([
    "PORT=3001 npx @arcisprotocol/mcp start:remote",
  ]);
  ui.sectionEnd();
}

export function showCustos() {
  ui.heading("CUSTOS — THE KEEPER");
  ui.info("Autonomous keeper agent for Arcis Protocol.");
  ui.info("Harvests yield, monitors health, services debt.");
  ui.spacer();

  ui.table(
    ["SKILL", "INTERVAL", "ACTIONS"],
    [
      [ui.ivory("VaultKeeper").toString(), ui.ivory("5 min").toString(), ui.ivoryMuted("harvest, rebalance, TVL alerts").toString()],
      [ui.ivory("CreditKeeper").toString(), ui.ivory("1 min").toString(), ui.ivoryMuted("loan health, liquidate, utilization").toString()],
      [ui.ivory("BondKeeper").toString(), ui.ivory("10 min").toString(), ui.ivoryMuted("serviceDebt, depositPrincipal").toString()],
      [ui.ivory("StatusReporter").toString(), ui.ivory("1 hour").toString(), ui.ivoryMuted("Telegram reports, protocol summary").toString()],
    ]
  );

  console.log();
  ui.info(ui.goldBright("Run CUSTOS:").toString());
  ui.code([
    "git clone https://github.com/Arcis-Protocol/custos.git",
    "cd custos && npm install",
    "CUSTOS_PRIVATE_KEY=0x... npx tsx src/index.ts",
  ]);
  ui.sectionEnd();
}

export function showSdk() {
  ui.heading("SDK");
  ui.kv("npm", "@arcisprotocol/sdk", ui.gold);
  ui.kv("Version", "0.3.1", ui.ivory);
  ui.kv("Modules", "ArcisVault, AgentCredit, RevenueBond", ui.ivory);
  ui.spacer();

  ui.info(ui.goldBright("Install:").toString());
  ui.code(["npm install @arcisprotocol/sdk viem"]);
  ui.spacer();

  ui.info(ui.goldBright("Quick start:").toString());
  ui.code([
    'import { Arcis, parseUSDC } from "@arcisprotocol/sdk";',
    "",
    "const arcis = new Arcis(publicClient, walletClient);",
    "await arcis.vault.deposit(parseUSDC(\"1000\"));",
    "const value = await arcis.vault.balance(agent);",
  ]);
  ui.sectionEnd();
}
