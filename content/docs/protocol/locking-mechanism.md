


# Locking Mechanism

SoulPeg enforces a time-based locking mechanism to ensure stability and discourage rapid inflow/outflow behaviors often seen in yield protocols. This mechanism applies to all sUSDC tokens minted through deposits or reward distributions.

## Lock Period Enforcement

Every time sUSDC is minted—whether through a user deposit or protocol reward—it is assigned a lock period. The duration is defined in seconds and is stored per user using the `unlockAt` mapping. During this time, the user’s tokens are effectively soul-bound and non-transferable.

- **Minimum lock**: 1 hour  
- **Maximum lock**: 365 days  
- **Custom lock**: Defined at the time of mint

The lock is enforced at the address level, meaning that it applies to the entire wallet, not to individual token units.

## Unlocking Process

Once the lock duration expires, tokens do not automatically become transferable. Users must explicitly call the `unlock()` function to change their wallet’s status. This deliberate action adds an extra layer of security, ensuring users are aware of unlocking before interacting with DEXs or other protocols.

Admins can also call `adminUnlock()` in special situations—such as emergency migration, fund recovery, or multisig-voted intervention.

## Special Cases

- **1-second dummy locks** are used for first-time reward recipients to enforce the same unlock process.
- Addresses with `balance == 0` are automatically unlocked via `_autoUnlock()` if they were previously locked.
- Some addresses (e.g., treasury wallets or protocol-controlled pools) can be flagged as `isSpecialAddress`, which disables locking entirely for operational flexibility.

## Checking Lock Status

Developers or users can access the current lock status via:
- `getRemainingLockTime(address)` → returns seconds remaining
- `getUserInfo(address)` → detailed user status including lock and stake data
- `getAvailableActions(address)` → shows whether the address can approve, transfer, or unlock

These helper functions make it easier to build safe and responsive interfaces around sUSDC token logic.