# Protocol Architecture

The SoulPeg protocol is composed of a single staking contract designed with strong modularity and clear separation of concerns. Its primary purpose is to issue and manage a soul-bound, yield-bearing token (sUSDC) while minimizing risks typically found in DeFi protocols.

## Core Design Principles

- **Minimalism**: A single contract governs all minting, burning, locking, and unlocking logic.
- **On-chain enforcement**: All critical constraints—such as transfer restrictions and lock timers—are enforced on-chain, not via frontend or governance off-chain logic.
- **Permissioned issuance**: All minting flows require explicit calls by an owner (ideally a multisig).
- **State clarity**: All relevant protocol and user states can be accessed via public view functions.

## Contract Composition

The primary smart contract extends the following OpenZeppelin modules:

- `ERC20`: Standard token interface.
- `ERC20Permit`: EIP-2612 gasless approvals.
- `Ownable2Step`: Secure two-step ownership transfers.
- `ReentrancyGuard`: Blocks nested reentrancy attacks.
- `Pausable`: Emergency pause switch.

## Functional Modules

The protocol contract includes:

- **Deposit & Minting**: Converts USDC → sUSDC at 1:1 with user-defined lock period.
- **Reward Minting**: Issues additional sUSDC under the same locking logic.
- **Unlocking**: Manual unlock after lock expiry.
- **Early Redemption**: Admin-controlled burn of sUSDC in exchange for USDC.
- **Whitelisting**: Transfer rights and DEX integration gated by whitelist.
- **Security Controls**: `pause()`, `emergencyWithdraw()`, `adminUnlock()`.

## Operational Boundaries

SoulPeg explicitly avoids:

- Auto-compounding or rebasing logic.
- Transferability by default.
- Inflation-based yield.
- Reliance on off-chain data feeds or oracles.

## Summary

The protocol architecture is purposefully constrained: it avoids unnecessary complexity to reduce the attack surface and improve auditability. With a single, compact contract structure and strict enforcement of lock/transfer logic, SoulPeg is designed for long-term reliability in adversarial environments.
