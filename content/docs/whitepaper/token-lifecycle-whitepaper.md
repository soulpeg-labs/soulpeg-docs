


# Token Lifecycle

The SoulPeg token lifecycle consists of controlled stages designed to enforce staking intent, yield eligibility, and transfer safety. Unlike typical staking tokens, sUSDC is soul-bound and interacts with the protocol through tightly scoped state transitions.

## Stage 1: Deposit and Minting

The lifecycle begins when a user authorizes the protocol to transfer USDC and the owner (typically a multisig) calls `depositAndMint()`. The contract mints sUSDC at a 1:1 ratio and locks the wallet for a user-specified period (min 1 hour, max 365 days). This lock is recorded in the `unlockAt` mapping.

## Stage 2: Locked Staking Period

While locked, the wallet:
- Cannot transfer or approve sUSDC freely
- Cannot use tokens in external protocols
- Is eligible for reward distribution via `rewardMint()`

Locked tokens reinforce the staking model by preventing short-term flipping or flash-loan-based behaviors.

## Stage 3: Manual Unlocking

Once the lock period expires, tokens remain non-transferable until the user calls `unlock()`. This manual step prevents passive unlocking by bots and ensures deliberate user re-engagement. From this point, the wallet is permanently marked as unlocked.

## Stage 4: Post-Unlock State

An unlocked wallet can:
- Transfer sUSDC (if recipient is also unlocked or whitelisted)
- Approve contracts for sUSDC usage (subject to protocol constraints)
- Interact with whitelisted DEXs or liquidity integrations

If the user’s balance becomes zero, the address is automatically marked unlocked via internal logic (`_autoUnlock()`).

## Reward Lifecycle

Rewards are distributed using `rewardMint()`, which:
- Mints sUSDC to a user
- Inherits their lock if already set
- Applies a 1-second dummy lock if none exists

This prevents instant reward liquidation and keeps yield tied to protocol participation.

## Early Redemption

The owner may call `earlyRedeem()` to allow a user to exit early, burning their sUSDC and returning USDC 1:1. This function is intended for exceptional scenarios and is not a user-callable feature.

## Lifecycle Integrity

All lifecycle transitions are enforced by contract logic:
- Transfers are blocked by `_update()` unless both parties are eligible
- Locks are timestamped and user-specific
- No unlocks occur passively
- Reward minting respects lock boundaries

The result is a token that is both yield-bearing and protocol-enforced, without the weaknesses of traditional transferable assets.