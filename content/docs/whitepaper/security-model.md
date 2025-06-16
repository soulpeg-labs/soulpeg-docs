


# Security Model

SoulPeg’s security strategy is built around protocol-level constraints, minimal trust assumptions, and on-chain enforceability. It avoids external dependencies, minimizes composability risks, and favors explicit control over speculative automation.

## Minimal Attack Surface

The protocol deliberately excludes:
- Price oracles
- Rebase mechanics
- Automated liquidity balancing
- Cross-chain bridges
- Third-party integrations at mint/transfer points

By removing these high-risk surfaces, SoulPeg significantly reduces its vulnerability footprint.

## Permissioned Minting and Transfers

All sUSDC minting flows (`depositAndMint`, `rewardMint`) are gated behind `onlyOwner`. Transfers are restricted via soulbound enforcement and cannot occur unless explicitly permitted by lock status or DEX whitelist.

## Manual Unlocking

There is no automatic transition from locked to unlocked. Users must manually call `unlock()` after their lock expires, ensuring conscious action before transfer is allowed. Admins may call `adminUnlock()` only in exceptional cases.

## Daily Limits

Two daily counters (`DAILY_DEPOSIT_LIMIT`, `DAILY_MINT_LIMIT`) ensure that no large-scale minting or flooding can occur in a 24-hour window, even if admin keys are compromised. This rate-limiting acts as a throttle against economic or governance-based attacks.

## Emergency Controls

The protocol includes:

- `pause()` and `unpause()` to stop minting and redeem flows
- `emergencyWithdrawUSDC()` to evacuate capital from the contract
- `recoverToken()` to reclaim non-sUSDC tokens sent by mistake

These controls are owner-only and expected to be governed by a multisig with potential timelock extension.

## Event Logging and Transparency

All sensitive operations emit events. This enables:

- Real-time monitoring
- Analytics dashboard integration
- On-chain forensics and community auditing

## Summary

SoulPeg prioritizes hard-coded, verifiable rules over reactive or off-chain governance. Its constrained design and enforced slowness reduce attack vectors and make the protocol resilient by design.