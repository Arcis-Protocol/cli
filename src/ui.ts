import chalk from "chalk";
import Table from "cli-table3";

// ── Arcis Brand Palette (color ramp with hue shifting) ──
export const gold = chalk.hex("#D4AF69");
export const goldBright = chalk.hex("#E2C47E");
export const goldHot = chalk.hex("#F0DCA0");
export const goldDim = chalk.hex("#8A7A52");
export const goldDeep = chalk.hex("#645228");
export const ivory = chalk.hex("#f0ece4");
export const ivoryMuted = chalk.hex("#8A8478");
export const green = chalk.hex("#4ADE80");
export const red = chalk.hex("#EF4444");
export const blue = chalk.hex("#60A5FA");
export const dim = chalk.dim;

// ── Truecolor helpers ──
const fg = (r: number, g: number, b: number) => `\x1b[38;2;${r};${g};${b}m`;
const bg = (r: number, g: number, b: number) => `\x1b[48;2;${r};${g};${b}m`;
const RST = "\x1b[0m";

// Brand color values for pixel art
const C = {
  gd: fg(100, 82, 40),   // gold deep (shadow)
  gm: fg(150, 120, 55),  // gold mid
  g:  fg(212, 175, 105), // gold
  gb: fg(226, 196, 126), // gold bright
  gh: fg(240, 220, 170), // gold hot (highlight)
  iv: fg(240, 236, 228), // ivory
  im: fg(138, 132, 120), // ivory muted
  vd: fg(4, 4, 6),       // void
  vb: bg(4, 4, 6),       // void bg
};

// ── Pixel Art Banner ──
export function banner() {
  const { gd, gm, g, gb, gh, iv, im, vd, vb } = C;

  console.log();
  console.log(`  ${gd}───────────────────────────────────────────────────${RST}`);
  console.log();
  console.log(`              ${gm}▄▄${g}▄▄▄▄▄▄▄${gm}▄▄${RST}`);
  console.log(`           ${gm}▄▄${g}██${gb}▓▓▓${gh}◆${gb}▓▓▓${g}██${gm}▄▄${RST}`);
  console.log(`         ${gm}▄${g}██${gb}▓▓${vb}${vd}         ${RST}${gb}▓▓${g}██${gm}▄${RST}     ${iv}A R C I S${RST}`);
  console.log(`        ${g}▐${gb}██${g}▌${vb}${vd}             ${RST}${g}▐${gb}██${g}▌${RST}    ${im}Protocol CLI  v0.2.0${RST}`);
  console.log(`        ${gm}▐${g}██${gm}▌${vb}${vd}             ${RST}${gm}▐${g}██${gm}▌${RST}    ${im}arcis.money${RST}`);
  console.log(`        ${gd}▐${gm}██${gd}▌${vb}${vd}             ${RST}${gd}▐${gm}██${gd}▌${RST}`);
  console.log(`        ${gd}▐${gm}██${gd}▌${vb}${vd}             ${RST}${gd}▐${gm}██${gd}▌${RST}    ${gd}Tres Functiones.${RST}`);
  console.log(`        ${gd}▀${gm}██${gd}▀▄▄▄▄▄▄▄▄▄▄▄▄▄${gd}▀${gm}██${gd}▀${RST}    ${gd}Unum Foedus.${RST}`);
  console.log();
  console.log(`  ${gd}───────────────────────────────────────────────────${RST}`);
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
  console.log(gold("  └") + goldDim("── Fortis Pecunia Machinae ──────────────"));
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

// ── Code Block ──
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

// ── Progress Bar (gradient gold) ──
export function progressBar(pct: number, width = 30): string {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  let bar = "";
  for (let i = 0; i < filled; i++) {
    // Gradient from deep gold to bright gold
    const t = filled > 1 ? i / (filled - 1) : 0;
    const r = Math.round(100 + t * 140);
    const g = Math.round(82 + t * 138);
    const b = Math.round(40 + t * 130);
    bar += `${fg(r, g, b)}█${RST}`;
  }
  bar += dim("░").repeat(empty);
  bar += ivoryMuted(` ${pct.toFixed(1)}%`);
  return bar;
}

// ── Status Dot ──
export function statusDot(active: boolean): string {
  return active ? green("●") : red("○");
}
