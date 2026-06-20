import chalk from "chalk";
import Table from "cli-table3";

// ── Arcis Terminal Colors ──
export const gold = chalk.hex("#D4AF69");
export const goldBright = chalk.hex("#E2C47E");
export const goldDim = chalk.hex("#8A7A52");
export const ivory = chalk.hex("#E8E0D0");
export const ivoryMuted = chalk.hex("#8A8478");
export const green = chalk.hex("#4ADE80");
export const red = chalk.hex("#EF4444");
export const blue = chalk.hex("#60A5FA");
export const dim = chalk.dim;

// ── Banner ──
export function banner() {
  console.log();
  console.log(gold("  ╔══════════════════════════════════════════════╗"));
  console.log(gold("  ║") + "                                              " + gold("║"));
  console.log(gold("  ║") + goldBright("        ╭─────╮                               ") + gold("║"));
  console.log(gold("  ║") + goldBright("        │     │   ") + ivory.bold("A R C I S") + "                    " + gold("║"));
  console.log(gold("  ║") + goldBright("        ┴     ┴   ") + ivoryMuted("Protocol CLI") + "                  " + gold("║"));
  console.log(gold("  ║") + "                                              " + gold("║"));
  console.log(gold("  ╚══════════════════════════════════════════════╝"));
  console.log();
}

// ── Section Header ──
export function heading(text: string) {
  console.log();
  console.log(gold("  ┌─ ") + ivory.bold(text));
  console.log(gold("  │"));
}

// ── Key-Value Line ──
export function kv(key: string, value: string, color?: typeof gold) {
  const colorFn = color || ivory;
  console.log(gold("  │  ") + ivoryMuted(key.padEnd(22)) + colorFn(value));
}

// ── Spacer ──
export function spacer() {
  console.log(gold("  │"));
}

// ── Section End ──
export function sectionEnd() {
  console.log(gold("  └──────────────────────────────────────────"));
  console.log();
}

// ── Success Message ──
export function success(msg: string) {
  console.log(gold("  │"));
  console.log(gold("  │  ") + green("✓ ") + ivory(msg));
}

// ── Error Message ──
export function error(msg: string) {
  console.log(gold("  │"));
  console.log(gold("  │  ") + red("✗ ") + chalk.white(msg));
}

// ── Info Message ──
export function info(msg: string) {
  console.log(gold("  │  ") + ivoryMuted(msg));
}

// ── Table ──
export function table(headers: string[], rows: string[][]) {
  const t = new Table({
    chars: {
      top: gold("─").toString(), "top-mid": gold("┬").toString(), "top-left": gold("  ┌").toString(), "top-right": gold("┐").toString(),
      bottom: gold("─").toString(), "bottom-mid": gold("┴").toString(), "bottom-left": gold("  └").toString(), "bottom-right": gold("┘").toString(),
      left: gold("  │").toString(), "left-mid": gold("  ├").toString(), mid: gold("─").toString(), "mid-mid": gold("┼").toString(),
      right: gold("│").toString(), "right-mid": gold("┤").toString(), middle: gold("│").toString(),
    },
    head: headers.map((h) => goldDim(h)),
    style: { "padding-left": 1, "padding-right": 1, border: [] },
  });
  rows.forEach((r) => t.push(r));
  console.log(t.toString());
}

// ── Format USDC ──
export function fmtUSDC(raw: bigint): string {
  const n = Number(raw) / 1e6;
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Format Rate ──
export function fmtRate(raw: bigint): string {
  const n = Number(raw) / 1e18;
  if (n > 1000 || n < 0.0001) return "1.000000";
  return n.toFixed(6);
}

// ── Format Percentage ──
export function fmtPct(bps: bigint): string {
  return (Number(bps) / 100).toFixed(1) + "%";
}

// ── Format Address ──
export function fmtAddr(addr: string, full = false): string {
  if (full) return addr;
  return addr.slice(0, 6) + "···" + addr.slice(-4);
}

// ── Progress Bar ──
export function progressBar(pct: number, width = 30): string {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  return gold("█").repeat(filled) + dim("░").repeat(empty) + ivoryMuted(` ${pct.toFixed(1)}%`);
}
