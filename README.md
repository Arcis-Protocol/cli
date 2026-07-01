# Arcis CLI

The citadel from your terminal. Live on Base mainnet.

## Install

```bash
npm install -g @arcisprotocol/cli
```

Or run without installing:

```bash
npx @arcisprotocol/cli status
```

## Commands

```
arcis status                  Full protocol overview (vault + credit + bonds)
arcis vault status            TVL, exchange rate, capacity, reserve/deployed
arcis vault balance <addr>    Agent position — shares, value, wallet
arcis vault deposit <amt>     Deposit USDC (-k privateKey)
arcis vault withdraw [shares] Withdraw raUSDC (-k key, -a for all)
arcis credit status           Lending pool, borrowed, utilization
arcis credit tiers            ERC-8004 reputation tier table
arcis credit health <id>      Check loan health
arcis bonds                   Revenue bond status
arcis token                   $CUSTOS token info and links
arcis contracts               Deployed addresses + ATI spec
arcis mcp                     MCP server setup for AI agents
arcis custos                  CUSTOS keeper agent info
arcis sdk                     TypeScript SDK quick start
```

## Examples

```bash
# Check the vault
arcis vault status

# Look up an agent's position
arcis vault balance 0xbae3fd2d46520ee76d53bf09abf42eb7b9ec6944

# Deposit $100 USDC
arcis vault deposit 100 -k 0xYOUR_PRIVATE_KEY

# Withdraw everything
arcis vault withdraw -k 0xYOUR_PRIVATE_KEY --all
```

## Environment

Set a custom RPC (recommended for production):

```bash
export BASE_RPC_URL="https://base-mainnet.g.alchemy.com/v2/YOUR_KEY"
```

## Contracts (Base Mainnet)

| Contract | Address |
|---|---|
| ArcisVault | `0x00325d9da832b38179ed2f0dabd4062d93e325a7` |
| AgentCredit | `0xdf31800e620f728297340d66acf5a306f07ce7a1` |
| RevenueBondFactory | `0xeb65d8bb08e0ea4a6bb9162d53d1b444f99681ba` |
| ATIRouter | `0xd0c64f997ca9aa427f8834578bd7f0313f868e83` |
| $CUSTOS | `0xD7C479F720b0bC2FF1088A16D1c06C3e11C62882` |

## Related

| Repo | Description |
|---|---|
| [`core`](https://github.com/Arcis-Protocol/core) | Smart contracts — 7 contracts, 116 tests |
| [`sdk`](https://github.com/Arcis-Protocol/sdk) | `@arcisprotocol/sdk` |
| [`mcp`](https://github.com/Arcis-Protocol/mcp) | `@arcisprotocol/mcp` |
| [`custos`](https://github.com/Arcis-Protocol/custos) | CUSTOS keeper agent |
| [`app`](https://github.com/Arcis-Protocol/app) | arcis.money |

## Links

- Website: https://arcis.money
- Dashboard: https://arcis.money/dashboard
- DeFiLlama: https://defillama.com/protocol/arcis-protocol
- Docs: https://github.com/Arcis-Protocol/docs

---

*ARCIS · The citadel of agent capital · MIT License*
