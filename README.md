# Arcis CLI

The citadel from your terminal.

## Install

```bash
git clone https://github.com/Arcis-Protocol/cli.git
cd cli && npm install
```

## Commands

```
arcis status                  Full protocol overview (vault + credit + bonds)
arcis vault status            Vault TVL, exchange rate, capacity
arcis vault balance <addr>    Agent position — shares, value, wallet
arcis vault deposit <amt>     Deposit USDC (-k privateKey)
arcis vault withdraw [shares] Withdraw raUSDC (-k privateKey, -a for all)
arcis credit status           Lending pool, borrowed, utilization
arcis credit tiers            ERC-8004 reputation tier table
arcis credit health <id>      Check loan health
arcis bonds                   Revenue bond status
arcis contracts               Deployed addresses + ATI v1.1 spec
arcis mcp                     MCP server setup for AI agents
arcis custos                  CUSTOS keeper agent info
arcis sdk                     TypeScript SDK quick start
```

## Related Repos

| Repo | Description |
|---|---|
| [`core`](https://github.com/Arcis-Protocol/core) | Smart contracts — 116 tests |
| [`sdk`](https://github.com/Arcis-Protocol/sdk) | `@arcisprotocol/sdk` |
| [`mcp`](https://github.com/Arcis-Protocol/mcp) | `@arcisprotocol/mcp` |
| [`custos`](https://github.com/Arcis-Protocol/custos) | Autonomous keeper agent |
| [`app`](https://github.com/Arcis-Protocol/app) | arcis.money |

---

*ARCIS · Fortis Pecunia Machinae · MMXXVI*
