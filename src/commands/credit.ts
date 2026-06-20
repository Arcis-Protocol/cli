import ora from "ora";
import { getPublicClient, getAddresses, CREDIT_ABI } from "../client.js";
import * as ui from "../ui.js";

const TIER_LABELS = ["No Identity", "Novice (1-25)", "Active (26-50)", "Established (51-75)", "Elite (76-100)"];
const TIER_NUMERALS = ["0", "I", "II", "III", "IV"];
const TIER_DISCOUNTS = ["0 bps", "100 bps", "200 bps", "350 bps", "500 bps"];

export async function creditStatus() {
  const spinner = ora({ text: ui.ivoryMuted("Querying credit module..."), color: "yellow" }).start();

  try {
    const client = getPublicClient();
    const addr = getAddresses();

    const [pool, borrowed] = await Promise.all([
      client.readContract({ address: addr.credit, abi: CREDIT_ABI, functionName: "lendingPool" }),
      client.readContract({ address: addr.credit, abi: CREDIT_ABI, functionName: "totalBorrowed" }),
    ]);

    const total = pool + borrowed;
    const utilPct = total > 0n ? Number(borrowed * 10000n / total) / 100 : 0;

    spinner.stop();

    ui.heading("CREDIT MODULE");
    ui.kv("Contract", ui.fmtAddr(addr.credit), ui.goldDim);
    ui.spacer();
    ui.kv("Lending Pool", ui.fmtUSDC(pool), ui.green);
    ui.kv("Total Borrowed", ui.fmtUSDC(borrowed), ui.ivory);
    ui.kv("Utilization", utilPct.toFixed(1) + "%", utilPct > 80 ? ui.red : ui.ivory);
    ui.info("  " + ui.progressBar(utilPct));
    ui.sectionEnd();

  } catch (e: any) {
    spinner.fail(ui.red("Failed to fetch credit status"));
    ui.error(e.message);
    ui.sectionEnd();
  }
}

export async function creditTiers() {
  const spinner = ora({ text: ui.ivoryMuted("Fetching reputation tiers..."), color: "yellow" }).start();

  try {
    const client = getPublicClient();
    const addr = getAddresses();

    const ratios = await Promise.all(
      [0, 1, 2, 3, 4].map((i) =>
        client.readContract({ address: addr.credit, abi: CREDIT_ABI, functionName: "collateralRatios", args: [BigInt(i)] })
      )
    );

    spinner.stop();

    ui.heading("ERC-8004 REPUTATION TIERS");

    ui.table(
      ["TIER", "LABEL", "COLLATERAL", "DISCOUNT"],
      ratios.map((r, i) => [
        ui.gold(TIER_NUMERALS[i]).toString(),
        ui.ivory(TIER_LABELS[i]).toString(),
        ui.ivory(ui.fmtPct(r)).toString(),
        ui.green(TIER_DISCOUNTS[i]).toString(),
      ])
    );

    console.log();

  } catch (e: any) {
    spinner.fail(ui.red("Failed to fetch tiers"));
    ui.error(e.message);
    ui.sectionEnd();
  }
}

export async function creditHealth(loanId: string) {
  const spinner = ora({ text: ui.ivoryMuted(`Checking loan #${loanId}...`), color: "yellow" }).start();

  try {
    const client = getPublicClient();
    const addr = getAddresses();
    const id = BigInt(loanId);

    const [healthy, owed] = await Promise.all([
      client.readContract({ address: addr.credit, abi: CREDIT_ABI, functionName: "isHealthy", args: [id] }),
      client.readContract({ address: addr.credit, abi: CREDIT_ABI, functionName: "totalOwed", args: [id] }),
    ]);

    spinner.stop();

    ui.heading(`LOAN #${loanId}`);
    ui.kv("Health", healthy ? "● HEALTHY" : "⚠ UNDERCOLLATERALIZED", healthy ? ui.green : ui.red);
    ui.kv("Total Owed", ui.fmtUSDC(owed), ui.gold);
    ui.sectionEnd();

  } catch (e: any) {
    spinner.fail(ui.red(`Failed to fetch loan #${loanId}`));
    ui.error(e.message);
    ui.sectionEnd();
  }
}
