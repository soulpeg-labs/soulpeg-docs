# Tokenomics

SoulPeg does not launch with a predefined total supply of sUSDC. The token supply is dynamic and minted on demand in response to protocol actions—either user deposits or controlled reward issuance.

## Initial Minting and Liquidity

At genesis, the total supply of sUSDC is zero. To bootstrap liquidity on a decentralized exchange (e.g., PancakeSwap), the protocol owner may pre-mint a fixed amount of sUSDC—such as 5,000 sUSDC—and pair it with an equivalent amount of USDC from treasury funds.

This operation is executed manually via the `rewardMint()` or `_mint()` function and unlocked via `adminUnlock()` to ensure compatibility with liquidity pools.

Example:
- Mint 5,000 sUSDC to treasury address
- Transfer 5,000 USDC from protocol reserves
- Add `sUSDC/USDC` liquidity on DEX
- Whitelist the DEX router using `setDex()`

This LP is used solely to improve accessibility and provide pricing anchors, not to encourage speculation.

## Mint Sources

sUSDC can be minted through:

- `depositAndMint()` – 1:1 user deposits with enforced lock
- `rewardMint()` – governance-controlled reward distribution
- `airdrop()` – treasury-to-user direct transfers (unlocked only)
- `manualMint` (constructor or internal `_mint()`) – for protocol operations like LP bootstrapping

## No Inflationary Curve

There is no algorithmic inflation, reward multiplier, or rebasing logic. All minting requires an explicit on-chain action and falls under protocol governance control. This ensures a conservative and predictable supply expansion.

## Burn Mechanisms

sUSDC can be burned through:

- `earlyRedeem()` – owner-driven burn with USDC payout
- `burn(address, amount)` – governance-invoked manual reduction
- Automatic burn via DEX swaps if paired with burning contracts

Burning is rare and used for error correction, liquidity balancing, or system-level recovery.

## Summary

SoulPeg's tokenomics are purpose-built for utility, not speculation. All supply is USDC-backed at mint, bound to wallet-level staking intent, and controlled exclusively through transparent protocol functions.
