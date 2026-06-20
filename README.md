# @arcis/cli

Arcis Protocol CLI — interact with agent vaults from your terminal.

```
  ╔══════════════════════════════════════════════╗
  ║        ╭─────╮                               ║
  ║        │     │   A R C I S                    ║
  ║        ┴     ┴   Protocol CLI                  ║
  ╚══════════════════════════════════════════════╝
```

## Install

```bash
git clone https://github.com/Arcis-Protocol/cli.git
cd cli && npm install
```

## Commands

### Protocol Overview
```bash
npx tsx src/index.ts status              # Full vault + credit overview
npx tsx src/index.ts contracts           # Deployed addresses + ATI spec
```

### Vault Operations
```bash
npx tsx src/index.ts vault status                          # TVL, rate, capacity
npx tsx src/index.ts vault balance 0xAgentAddress          # Agent position
npx tsx src/index.ts vault deposit 1000 -k $AGENT_KEY      # Deposit 1000 USDC
npx tsx src/index.ts vault withdraw 500 -k $AGENT_KEY      # Withdraw 500 raUSDC
npx tsx src/index.ts vault withdraw -a -k $AGENT_KEY       # Withdraw all
```

### Credit Module
```bash
npx tsx src/index.ts credit status       # Lending pool, utilization
npx tsx src/index.ts credit tiers        # ERC-8004 reputation tier table
npx tsx src/index.ts credit health 1     # Check loan #1 health
```

## Example Output

```
  ┌─ VAULT STATUS
  │
  │  Status                ●  ACTIVE
  │  Network               Base Sepolia (84532)
  │  Contract              0xa8eF···E98d
  │
  │  Total Value Locked    $11,250.00
  │  raUSDC Supply         0.01 raUSDC
  │  Exchange Rate         1.000000
  │
  │  Reserve (Liquid)      $11,250.00 (100.0%)
  │  Deployed (Yield)      $0.00 (0.0%)
  │
  │  Deposit Cap           $10,000,000.00
  │  Remaining             $9,988,750.00
  │    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0.1%
  └──────────────────────────────────────────
```

## Network

Currently targets Base Sepolia testnet. Mainnet support will be added after deployment.

---

*ARCIS · Of the Citadel · MMXXVI*
