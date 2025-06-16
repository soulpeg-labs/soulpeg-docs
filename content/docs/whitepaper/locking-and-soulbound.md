


# Locking & Soulbound Logic

SoulPeg enforces token immobility through a combination of per-address time locks and protocol-restricted transfer permissions. Together, these mechanics form the basis for the soul-bound nature of sUSDC and the protocol’s security architecture.

## Locking Mechanism

Each time sUSDC is minted—via user deposit or reward distribution—the recipient address is locked for a defined duration. This lock period is stored on-chain using the `unlockAt` mapping.

- Minimum lock: 1 hour
- Maximum lock: 365 days
- Unlock is manual via the `unlock()` function

Locks apply to the entire wallet and not per token or batch. A locked address cannot transfer, approve, or otherwise interact with sUSDC beyond protocol-sanctioned actions.

## Soul-Bound Enforcement

The contract overrides the internal `_update()` function to inspect every token movement. Transfers are rejected unless:

- The transfer is a mint or burn
- The sender and receiver are both unlocked
- The operation involves a whitelisted DEX or special address

This ensures that sUSDC remains bound to the originating wallet until explicitly unlocked.

## Explicit Unlock Step

After a lock expires, tokens remain immobilized until the holder explicitly calls `unlock()`. This extra step ensures conscious user engagement and protects against passive, automated transitions (e.g., flash bots triggering unlock-and-transfer exploits).

## One-Time Unlock

Once a wallet is unlocked, it remains unlocked permanently. The protocol uses `unlockAt[address] = 1` to indicate this state. Users are not required to re-lock their addresses, nor can they opt to voluntarily re-bind their sUSDC.

## Auto-Unlock via Burn

If a wallet’s balance becomes zero while it is still marked as locked (`unlockAt > 1`), the contract automatically resets its lock status via `_autoUnlock()`. This is important for cleaning up wallet state when users fully redeem or burn their positions.

## Summary

Locking and soulbound enforcement are not separate features—they are interdependent components of the same constraint system. The protocol’s token logic ensures that sUSDC can only move under verified, intentional, and compliant conditions. This design hardens the staking layer against composability attacks and enforces genuine position ownership.