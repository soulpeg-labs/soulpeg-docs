


# How Do I Unlock My Tokens?

Unlocking your sUSDC is a required manual step after your lock period expires. Until this step is performed, your tokens will remain non-transferable even if the lock duration has passed.

## When Should I Unlock?

You should unlock your address when:
- Your time-based lock has expired (check via `getRemainingLockTime()`)
- You want to transfer, trade, or interact with DEXs or other protocols
- You are no longer staking and need to access utility of your sUSDC

## How to Unlock

To unlock your wallet:
1. Wait until your lock period expires
2. Call the `unlock()` function on the SoulPeg contract from your wallet
3. After unlocking, your address becomes permanently transferable

This action only needs to be done once per address, not per token.

## How to Know If You’re Still Locked

You can check your lock status using:
- SoulPeg dashboard (if integrated)
- `getRemainingLockTime(address)` on-chain
- `getUserInfo(address)` for detailed info

If `remainingTime > 0`, you’re still locked.

## Can Someone Else Unlock Me?

No. Only the wallet owner can call `unlock()` for themselves. This ensures that unlocking is always intentional.

The only exception is `adminUnlock()`, which can be triggered by the protocol owner in rare cases (e.g., migrations, emergency recovery).

## Summary

Unlocking is an essential security feature. It ensures that token transfers only happen after intentional user action and reinforces the integrity of the SoulPeg staking model.