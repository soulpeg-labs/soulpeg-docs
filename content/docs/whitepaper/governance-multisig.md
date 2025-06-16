


# Governance & Multisig

SoulPeg uses owner-restricted functions for all critical protocol operations, including minting, unlocking, burning, redeeming, and configuration. These operations are intentionally gated to allow for precise control, but must also be governed transparently and securely.

## Multisig Ownership

It is strongly recommended that protocol ownership be transferred to a multisig wallet, such as a Gnosis Safe. This ensures that no single party can execute privileged actions unilaterally.

Benefits:
- Reduces single-point-of-failure risk
- Enables shared accountability
- Supports delay modules for emergency reaction windows

## Privileged Functions

The following operations are restricted via `onlyOwner`:

- `depositAndMint()`
- `rewardMint()`
- `earlyRedeem()`
- `burn()`
- `pause()` / `unpause()`
- `adminUnlock()`
- `setDex()` and `setSpecialAddress()`
- `recoverToken()` and `emergencyWithdrawUSDC()`

These functions are foundational to system operation and must be controlled by trusted, coordinated governance.

## Future-Proofing Governance

The current system assumes off-chain governance (e.g., multisig vote execution). However, SoulPeg is compatible with future upgrades to DAO-managed or on-chain governance models, where:

- Proposals are created and voted on by token holders or stakers
- Execution is triggered by smart contract governance modules
- Timelocks enforce delay windows between approval and execution

This allows gradual decentralization without undermining protocol safety.

## Emergency and Operational Balance

Multisig governance provides the best balance between responsiveness and decentralization. Timelock-enforced upgrades and limited execution rights ensure that emergency actions are possible without granting unchecked power to any single signer.

## Summary

SoulPeg governance is built for transparency, auditability, and multi-party control. By delegating owner functions to a multisig and planning for future DAO integration, the protocol ensures that critical decisions remain secure, intentional, and accountable.