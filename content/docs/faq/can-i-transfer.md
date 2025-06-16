

# Can I Transfer sUSDC?

By design, sUSDC is a non-transferable token—meaning it cannot be freely sent or traded between wallets like standard ERC-20 tokens. This restriction is intentional and core to the SoulPeg protocol’s staking logic.

## When Transfers Are Blocked

While your wallet is in a locked state, you cannot:
- Transfer sUSDC to another address
- Approve arbitrary contracts to spend your sUSDC
- Interact with most DEXs or protocols using sUSDC

Any attempt to do so will revert with a `Locked: transfer disabled` or similar error.

## When Transfers Are Allowed

Transfers become available only when:
- Your lock has expired, and
- You have explicitly called the `unlock()` function

Once unlocked, you can:
- Transfer sUSDC to another unlocked wallet
- Interact with whitelisted DEX contracts (if supported)
- Use your sUSDC in SoulPeg-integrated apps or services

## Special Exceptions

- Certain addresses (e.g. treasury or liquidity pools) may be whitelisted as “special addresses” and exempt from lock restrictions.
- The protocol owner may allow specific routers or staking contracts to receive sUSDC even if tokens are still technically locked, using the `setDex()` function.

## Summary

sUSDC is not a freely tradable token. Its primary role is to represent a personal, time-bound staking position. Transfers are only permitted once your lock has expired and you’ve explicitly unlocked your address.