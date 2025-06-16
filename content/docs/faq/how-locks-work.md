# How Locking Works

SoulPeg uses a time-based locking system to enforce staking commitments and mitigate short-term gaming or abuse. When sUSDC is minted—either via deposit or reward—it becomes locked to the user’s wallet for a fixed duration.

## What Triggers a Lock?

A lock is applied whenever:
- A user deposits USDC and receives sUSDC
- A user receives rewards through `rewardMint()`

The lock duration is set during minting and must fall between:
- **Minimum**: 1 hour
- **Maximum**: 365 days

The lock applies to the entire wallet address, not individual token units.

## How Do I Know If I’m Locked?

You can check your lock status via:
- `getUserInfo(address)` → shows remaining lock time
- `getRemainingLockTime(address)` → returns seconds left
- Frontend interfaces (such as dashboards) that visualize this data

If the `remainingTime` is greater than 0, your tokens are still locked.

## When Do I Unlock?

After your lock duration expires, your wallet does not automatically become unlocked. You must explicitly call the `unlock()` function to mark your address as transferable. This adds a manual security step.

Admins can also unlock wallets using `adminUnlock()` if necessary (e.g., during migrations or in emergencies).

## Can I Skip the Lock?

No. All sUSDC is soul-bound by default. There is no option to mint sUSDC without a lock. Even reward recipients who never staked before will receive a 1-second dummy lock that still requires a manual unlock.

## Summary

Locking is a core part of the SoulPeg staking model. It ensures staking is intentional, time-bound, and resistant to abuse. Unlocking is always manual to protect users and preserve protocol fairness.
