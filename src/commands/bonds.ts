import ora from "ora";
import { getPublicClient, getAddresses, BOND_ABI } from "../client.js";
import * as ui from "../ui.js";

export async function bondStatus() {
  const addr = getAddresses();

  if (!addr.bondFactory) {
    ui.heading("REVENUE BONDS");
    ui.info("RevenueBondFactory not yet deployed to this network.");
    ui.info("Bonds will be available after mainnet launch.");
    ui.spacer();
    ui.info("Agents issue bonds. Humans buy yield. Smart contracts service debt.");
    ui.sectionEnd();
    return;
  }

  const spinner = ora({ text: ui.ivoryMuted("Querying bonds..."), color: "yellow" }).start();

  try {
    const client = getPublicClient();

    const [bondCount, paused] = await Promise.all([
      client.readContract({ address: addr.bondFactory, abi: BOND_ABI, functionName: "bondCount" }),
      client.readContract({ address: addr.bondFactory, abi: BOND_ABI, functionName: "paused" }),
    ]);

    spinner.stop();

    ui.heading("REVENUE BONDS");
    ui.kv("Status", paused ? "⏸  PAUSED" : "●  ACTIVE", paused ? ui.red : ui.green);
    ui.kv("Contract", ui.fmtAddr(addr.bondFactory), ui.goldDim);
    ui.spacer();
    ui.kv("Bonds Issued", bondCount.toString(), ui.gold);
    ui.sectionEnd();

  } catch (e: any) {
    spinner.fail(ui.red("Failed to fetch bond status"));
    ui.error(e.message);
    ui.sectionEnd();
  }
}
