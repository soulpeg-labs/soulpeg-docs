


# How Are Rewards Distributed?

SoulPeg distributes staking rewards through a controlled on-chain process rather than relying on automatic rebasing or inflation. Rewards are delivered in the form of sUSDC and are subject to the same locking mechanics as initial deposits.

## How Are Rewards Generated?

The protocol does not mint arbitrary yield. Instead, rewards are distributed based on:

- Protocol-collected fees
- Treasury strategies (e.g. partnerships, integrations)
- Manual issuance by governance or operators

This ensures all rewards are backed by actual capital or protocol revenue and are not based on inflationary mechanics.

## How Are Rewards Delivered?

Rewards are issued using the `rewardMint()` function by the protocol owner (typically a multisig). This function mints sUSDC to specific addresses and inherits their lock status.

- If the address is already locked: new rewards are added to the existing lock
- If the address is new or was never locked: a 1-second dummy lock is applied

Users must still call `unlock()` before rewards become transferable after any lock period.

## Can I Claim Rewards Manually?

There is no claim button or automatic payout. All rewards are delivered directly to your wallet by the protocol. This approach avoids the need for user-triggered on-chain calls and helps reduce gas usage.

## Summary

SoulPeg rewards are minted deliberately and conservatively by protocol governance. They are delivered as locked sUSDC and follow the same rules as standard deposits, preserving fairness and security in the reward system.