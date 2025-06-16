


# Token Lifecycle

The SoulPeg protocol manages a complete lifecycle for sUSDC, the soul-bound staking token. Each step is carefully designed to enforce security, ensure accountability, and deliver sustainable yield without speculative transferability.

## 1. Deposit and Mint

Users begin by authorizing the protocol to transfer USDC from their wallets. Once approved, the protocol mints an equivalent amount of sUSDC (1:1) to the user’s address. This operation is executed by the protocol owner (typically a multisig) using the `depositAndMint()` function.

Key characteristics:
- sUSDC is minted with a defined lock period (min 1 hour, max 365 days)
- Lock is enforced per-wallet via a timestamp (`unlockAt`)
- Tokens are non-transferable while locked

## 2. Lock Period

Upon minting, the user’s wallet is time-locked, preventing token movement or approval until the lock expires. Lock durations are user-defined but bounded within the allowed range. After the lock expires, the user must manually call `unlock()` to transition their address into a fully transferable state.

## 3. Reward Distribution

The protocol periodically issues yield through the `rewardMint()` function. This function mints additional sUSDC tokens to selected users. Newly minted rewards inherit the lock status:
- If the user is already locked, new rewards follow the existing lock
- If the user is new, a 1-second dummy lock is applied to enforce a manual `unlock()` step

## 4. Unlocking

Once the lock period expires, users must explicitly call `unlock()` to mark their address as transferable. This adds an extra layer of security and prevents accidental token transfers. Admins may also perform an emergency unlock using `adminUnlock()` in special cases.

## 5. Redemption

If early exit is required, admins may invoke `earlyRedeem()` to burn sUSDC from a user and return an equal amount of USDC. This process is strictly owner-controlled and requires the protocol to hold sufficient USDC reserves.

## 6. Lifecycle Completion

After unlocking, users can:
- Transfer sUSDC (if protocol allows via `isDex`)
- Interact with whitelisted DEX or liquidity pools
- Burn sUSDC via `burn()` for treasury or system operations

The lifecycle is tracked on-chain using mappings like `unlockAt`, `totalStaked`, and `hasStaked`, allowing complete visibility into staking history and lock status.