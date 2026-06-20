import { getAddresses } from "../client.js";
import * as ui from "../ui.js";

export function showContracts() {
  const addr = getAddresses();

  ui.heading("DEPLOYED CONTRACTS");
  ui.kv("Network", "Base Sepolia (84532)", ui.ivory);
  ui.kv("Explorer", addr.explorer, ui.blue);
  ui.spacer();

  ui.table(
    ["CONTRACT", "ADDRESS", "ROLE"],
    [
      [ui.ivory("ArcisVault").toString(), ui.goldDim(addr.vault).toString(), ui.gold("raUSDC").toString()],
      [ui.ivory("AgentCredit").toString(), ui.goldDim(addr.credit).toString(), ui.gold("ERC-8004").toString()],
      [ui.ivory("ATIRouter").toString(), ui.goldDim(addr.router).toString(), ui.gold("Entry Point").toString()],
      [ui.ivory("Allocator").toString(), ui.goldDim(addr.allocator).toString(), ui.gold("Strategies").toString()],
      [ui.ivory("USDC").toString(), ui.goldDim(addr.usdc).toString(), ui.ivoryMuted("Testnet").toString()],
    ]
  );

  console.log();
  ui.heading("ATI v1.1");
  ui.info(ui.goldBright("Core:").toString());
  ui.code([
    "deposit(uint256 amount)    → uint256 shares",
    "withdraw(uint256 shares)   → uint256 amount",
    "balance(address agent)     → uint256 value",
  ]);
  ui.spacer();
  ui.info(ui.goldBright("Discovery:").toString());
  ui.code([
    "asset()                    → address token",
    "totalAssets()              → uint256 tvl",
    "maxDeposit(address agent)  → uint256 max",
  ]);
  ui.sectionEnd();
}
