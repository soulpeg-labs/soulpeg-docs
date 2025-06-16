


# Contract Design

The SoulPeg protocol is implemented as a single smart contract with carefully layered security, operational flexibility, and on-chain transparency. The design favors clarity, auditability, and minimal external dependency.

## Architecture Overview

The `StakeableAsset` contract inherits functionality from several OpenZeppelin components:

- `ERC20`: standard token interface
- `ERC20Permit`: enables gasless approvals (EIP-2612)
- `Ownable2Step`: two-step ownership transfer for security
- `Pausable`: allows emergency pause of critical functions
- `ReentrancyGuard`: prevents nested reentrant calls

This composition provides the core foundation for a secure and maintainable staking token.

## Key Features

- **Soul-bound logic**: Enforced via a custom `_update()` hook that locks transfers by default.
- **Time-based locks**: Implemented using `unlockAt` mapping per wallet.
- **Manual unlocking**: Users must call `unlock()` to enable transferability.
- **Whitelist control**: DEX and pool addresses can be whitelisted via `setDex()`.
- **Reward minting**: Admin can issue locked or dummy-locked sUSDC using `rewardMint()`.
- **Emergency functions**: Includes `pause()`, `adminUnlock()`, `emergencyWithdrawUSDC()`, `recoverToken()`.

## Events

All critical actions emit events for external tracking and transparency:

- `Deposited`, `Unlocked`, `RewardsDistributed`, `EarlyRedeemed`
- `DexWhitelisted`, `TreasurySweep`, `SpecialAddressSet`
- `StakedTokensBurned`, `EmergencyWithdraw`

These events facilitate frontend updates, subgraph indexing, and audit logging.

## Versioning and Deployment

- Solidity version: `^0.8.27`
- Deployed on: Binance Smart Chain (BSC)
- USDC target: Assumes USDC on BSC uses 18 decimals
- Upgradeability: The contract is not upgradeable by proxy, but owner-based control supports governance changes
- Multisig recommended: Contract ownership should be transferred to a Gnosis Safe multisig for operational security

## Gas and Efficiency

The contract is optimized for gas usage:
- Batch operations available for minting and deposit (`batchDepositAndMint`)
- Single ERC20 balance storage per user
- Lock information stored in lightweight `uint40` timestamps

## Summary

The SoulPeg contract is designed with long-term maintainability and trust in mind. By enforcing strong constraints at the protocol layer, and minimizing reliance on off-chain systems, it serves as a transparent, efficient, and auditable foundation for yield-bearing soul-bound assets.