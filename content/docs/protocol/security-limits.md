


# Security & Limits

SoulPeg’s architecture includes multiple layers of built-in safety mechanisms to reduce risk, ensure system integrity, and prevent abuse. These controls span from smart contract-level protections to operational governance practices.

## Daily Limits

To mitigate the impact of potential exploits and preserve protocol health, SoulPeg enforces daily caps on deposit and mint volumes:

- **DAILY_DEPOSIT_LIMIT**: Maximum amount of USDC that can be deposited across all users per 24-hour period.
- **DAILY_MINT_LIMIT**: Maximum amount of sUSDC that can be minted across all users per 24-hour period.

These limits are reset every new day (UTC-based) and tracked using on-chain counters. Exceeding them results in transaction reverts.

## Reentrancy Protection

All state-changing functions that involve external calls are wrapped with OpenZeppelin’s `nonReentrant` modifier. This prevents common reentrancy attacks where malicious contracts attempt to recursively interact with the protocol during execution.

## Emergency Controls

SoulPeg includes emergency tools that can be used by the protocol owner (typically a multisig):

- `pause()` and `unpause()` to halt or resume sensitive operations
- `emergencyWithdrawUSDC()` to recover protocol-held USDC in case of systemic risk
- `recoverToken()` to rescue mistakenly sent tokens (excluding sUSDC or core stablecoins)

These functions are gated behind `onlyOwner` access and designed to be used with timelocks or multisig governance.

## Whitelisted Operations

To prevent unauthorized integrations, only approved DEXs, routers, and staking pools may interact with locked sUSDC. Whitelisting is controlled via `setDex()` and stored in the `isDex` mapping.

## Role Separation and Ownership

- The contract uses `Ownable2Step`, enabling secure transfer of ownership in two phases.
- All sensitive functions (minting, sweeping, unlocks) are restricted to `onlyOwner`.
- It is strongly recommended that ownership be assigned to a Gnosis Safe multisig with appropriate delay modules for critical functions.

## Transparency by Design

Every sensitive action emits events that can be tracked off-chain:
- `Paused`, `Unpaused`, `EmergencyWithdraw`, `TreasurySweep`, etc.
- Limit counters and protocol statistics are available via `getDailyLimitStatus()` and `getProtocolStats()`.

## Summary

Security in SoulPeg is enforced through real on-chain constraints, not just assumed economic incentives. The layered approach—combining rate limiting, reentrancy guards, ownership control, and event logging—makes the system resilient to both technical and economic attacks.