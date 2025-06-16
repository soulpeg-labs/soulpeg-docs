


# Security Safeguards

SoulPeg integrates multiple security layers at both the smart contract and operational level to protect user funds and ensure protocol integrity.

## Reentrancy Protection

All sensitive functions that involve external calls (e.g., transfers, mints, redemptions) are wrapped with OpenZeppelin’s `ReentrancyGuard`. This ensures attackers cannot exploit reentrant execution paths.

## Pause Functionality

The contract includes a `pause()` mechanism that allows the owner (typically a multisig) to halt all sensitive operations in case of emergencies. This includes minting, unlocking, redeeming, and reward distribution.

The protocol can later be resumed with `unpause()` once the issue is resolved.

## Daily Limits

To prevent abuse through high-frequency or high-volume operations, SoulPeg enforces daily mint and deposit limits:
- `DAILY_DEPOSIT_LIMIT`
- `DAILY_MINT_LIMIT`

These are enforced via internal counters that reset every 24 hours and are used across all minting functions.

## Transfer Restrictions

By default, all transfers are blocked unless:
- The user has explicitly unlocked their wallet
- The sender or receiver is a whitelisted DEX or special address
- The transfer is a mint or burn

This reduces attack surfaces from token composability and P2P manipulation.

## OnlyOwner Controls

All critical functions (minting, unlocking, sweeping, redeeming) are gated behind `onlyOwner` access. It is strongly recommended to transfer ownership to a Gnosis Safe multisig and optionally integrate timelock modules.

## Event Logging

Every sensitive action emits events to the blockchain, such as:
- `Paused`, `Unpaused`
- `EmergencyWithdraw`, `TreasurySweep`
- `RewardsDistributed`, `DexWhitelisted`

This provides transparency and enables integration with monitoring systems like The Graph or on-chain alerting tools.

## Summary

SoulPeg’s protocol design prioritizes embedded security, not just surface-level protections. Through reentrancy guards, daily limits, pausability, and explicit ownership controls, the protocol maintains a strong and proactive defense posture.