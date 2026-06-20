import chalk from "chalk";
import Table from "cli-table3";

// ── Arcis Brand Colors ──
export const gold = chalk.hex("#D4AF69");
export const goldBright = chalk.hex("#E2C47E");
export const goldDim = chalk.hex("#8A7A52");
export const ivory = chalk.hex("#f0ece4");
export const ivoryMuted = chalk.hex("#8A8478");
export const green = chalk.hex("#4ADE80");
export const red = chalk.hex("#EF4444");
export const blue = chalk.hex("#60A5FA");
export const dim = chalk.dim;
export const stone = chalk.hex("#0F0F12");

// ── Banner ──
export function banner() {
  const g = gold;
  const gb = goldBright;
  const iv = ivoryMuted;
  console.log();
  console.log(g("  ═══════════════════════════════════════════════"));
  console.log();
  console.log(g("              ╱") + gb("◆") + g("╲"));
  console.log(g("           ╱") + gb("══") + g("╧") + gb("══") + g("╲"));
  console.log(g("          ║") + "       " + g("║") + "     " + ivory.bold("A R C I S"));
  console.log(g("          ║") + "       " + g("║") + "     " + iv("Protocol CLI  v0.2.0"));
  console.log(g("          ╨") + "       " + g("╨") + "     " + iv("arcis.money"));
  console.log();
  console.log(g("  ═══════════════════════════════════════════════"));
  console.log();
}

// ── Section Header ──
export function heading(text: string) {
  console.log();
  console.log(gold("  ┌─") + gold("─".repeat(text.length + 2)) + gold("─┐"));
  console.log(gold("  │ ") + ivory.bold(text) + gold(" │"));
  console.log(gold("  └─") + gold("─".repeat(text.length + 2)) + gold("─┘"));
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

// ── Divider ──
export function divider() {
  console.log(gold("  ├──────────────────────────────────────────"));
}

// ── Section End ──
export function sectionEnd() {
  console.log(gold("  │"));
  console.log(gold("  └") + goldDim("─── Fortis Pecunia Machinae ─────────────"));
  console.log();
}

// ── Success ──
export function success(msg: string) {
  console.log(gold("  │"));
  console.log(gold("  │  ") + green("✓ ") + ivory(msg));
}

// ── Error ──
export function error(msg: string) {
  console.log(gold("  │"));
  console.log(gold("  │  ") + red("✗ ") + chalk.white(msg));
}

// ── Info ──
export function info(msg: string) {
  console.log(gold("  │  ") + ivoryMuted(msg));
}

// ── Code Block (for ATI, MCP config) ──
export function code(lines: string[]) {
  console.log(gold("  │"));
  for (const line of lines) {
    console.log(gold("  │  ") + goldDim("  ") + gold(line));
  }
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

// ── Formatters ──
export function fmtUSDC(raw: bigint): string {
  const n = Number(raw) / 1e6;
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

// ── Progress Bar ──
export function progressBar(pct: number, width = 30): string {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  return gold("█").repeat(filled) + dim("░").repeat(empty) + ivoryMuted(` ${pct.toFixed(1)}%`);
}

// ── Status Dot ──
export function statusDot(active: boolean): string {
  return active ? green("●") : red("○");
}
