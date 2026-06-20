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
      [ui.ivory("USDC").toString(), ui.goldDim(addr.usdc).toString(), ui.ivoryMuted("Mock").toString()],
    ]
  );

  console.log();
  ui.heading("ATI STANDARD");
  ui.info(ui.gold("deposit").toString() + ui.ivory("(uint256 amount) → uint256 shares").toString());
  ui.info(ui.gold("withdraw").toString() + ui.ivory("(uint256 shares) → uint256 amount").toString());
  ui.info(ui.gold("balance").toString() + ui.ivory("(address agent) → uint256 value").toString());
  ui.sectionEnd();
}
