import chalk from "chalk";
import Table from "cli-table3";

// ── Brand Colors ──
export const gold = chalk.hex("#D4AF69");
export const goldBright = chalk.hex("#E2C47E");
export const goldDim = chalk.hex("#8A7A52");
export const ivory = chalk.hex("#f0ece4");
export const ivoryMuted = chalk.hex("#8A8478");
export const green = chalk.hex("#4ADE80");
export const red = chalk.hex("#EF4444");
export const blue = chalk.hex("#60A5FA");
export const dim = chalk.dim;

// ── Banner ──
export function banner() {
  const W = 40;
  const border = goldDim;
  const pad = (s: string, vis: number) => s + " ".repeat(W - 4 - vis);

  console.log();
  console.log(border("  ┌" + "─".repeat(W - 2) + "┐"));
  console.log(border("  │" + " ".repeat(W - 2) + "│"));
  console.log(border("  │  ") + gold("ARCIS") + border(pad("", 5) + "│"));
  console.log(border("  │  ") + ivoryMuted("The citadel of agent capital") + border(pad("", 28) + "│"));
  console.log(border("  │" + " ".repeat(W - 2) + "│"));
  console.log(border("  └" + "─".repeat(W - 2) + "┘"));
  console.log();
}

// ── Section Header ──
export function heading(text: string) {
  console.log();
  console.log(gold("  " + text));
  console.log(goldDim("  " + "─".repeat(text.length)));
  console.log();
}

// ── Key-Value Line ──
export function kv(key: string, value: string, color?: typeof gold) {
  const colorFn = color || ivory;
  console.log("  " + ivoryMuted(key.padEnd(22)) + colorFn(value));
}

// ── Spacer ──
export function spacer() {
  console.log();
}

// ── Section End ──
export function sectionEnd() {
  console.log();
}

// ── Success ──
export function success(msg: string) {
  console.log("  " + green("✓ ") + ivory(msg));
}

// ── Error ──
export function error(msg: string) {
  console.log("  " + red("✗ ") + chalk.white(msg));
}

// ── Info ──
export function info(msg: string) {
  console.log("  " + ivoryMuted(msg));
}

// ── Code Block ──
export function code(lines: string[]) {
  console.log();
  for (const line of lines) {
    console.log("  " + goldDim("  ") + gold(line));
  }
}

// ── Table ──
export function table(headers: string[], rows: string[][]) {
  const t = new Table({
    chars: {
      top: goldDim("─").toString(), "top-mid": goldDim("┬").toString(), "top-left": goldDim("  ┌").toString(), "top-right": goldDim("┐").toString(),
      bottom: goldDim("─").toString(), "bottom-mid": goldDim("┴").toString(), "bottom-left": goldDim("  └").toString(), "bottom-right": goldDim("┘").toString(),
      left: goldDim("  │").toString(), "left-mid": goldDim("  ├").toString(), mid: goldDim("─").toString(), "mid-mid": goldDim("┼").toString(),
      right: goldDim("│").toString(), "right-mid": goldDim("┤").toString(), middle: goldDim("│").toString(),
    },
    head: headers.map((h) => goldDim(h)),
    style: { "padding-left": 1, "padding-right": 1, border: [] },
  });
  rows.forEach((r) => t.push(r));
  console.log(t.toString());
}

// ── Formatters ──
export function fmtUSDC(raw: bigint): string {
  return "$" + (Number(raw) / 1e6).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtRate(raw: bigint): string {
  const n = Number(raw) / 1e18;
  if (n > 1000 || n < 0.0001) return "1.000000";
  return n.toFixed(6);
}

export function fmtPct(bps: bigint): string {
  return (Number(bps) / 100).toFixed(1) + "%";
}

export function fmtAddr(addr: string, full = false): string {
  if (full) return addr;
  return addr.slice(0, 6) + "···" + addr.slice(-4);
}

export function progressBar(pct: number, width = 30): string {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  return gold("█").repeat(filled) + dim("░").repeat(empty) + ivoryMuted(` ${pct.toFixed(1)}%`);
}
