# What If I Lose My Wallet?

Losing access to your wallet is a critical issue in any blockchain-based protocol. In SoulPeg, since sUSDC is a soul-bound and non-transferable token, losing your wallet means permanently losing access to your staked assets.

## Can I Recover My sUSDC?

No. sUSDC is not recoverable or transferable. It is permanently tied to your wallet address and cannot be sent to another wallet, even by an admin. There is no recovery mechanism available once you lose access to the private keys or seed phrase.

## Why No Recovery?

This strict design is intentional:

- Prevents any form of custodial control or centralized recovery
- Reinforces user responsibility and decentralization
- Eliminates risks of unauthorized transfer or social engineering attacks

## What About Admin Unlock?

`adminUnlock()` only removes the lock restriction from a wallet address. It does not allow token transfers or ownership recovery. It cannot help if you’ve lost access to your wallet.

## Recommended Precautions

- Store your seed phrase securely in multiple physically safe locations
- Use a hardware wallet if possible
- Consider using multisig wallets or account abstraction (if supported in future)
- Regularly test wallet access to ensure availability

## Summary

If you lose access to your wallet, your sUSDC and staking position are permanently inaccessible. SoulPeg does not implement any centralized recovery or override mechanisms to preserve full decentralization and protocol integrity.
