


# Burn & Supply Control

SoulPeg includes administrative burn functionality to enable controlled reduction of circulating sUSDC in rare or protocol-critical scenarios. Unlike inflationary systems that continuously expand supply, SoulPeg emphasizes manual supply discipline, including the ability to retire tokens when necessary.

## Purpose of Burn Functionality

The `burn(address,uint256)` function allows the protocol owner to forcibly remove sUSDC from any address. While powerful, this function is gated behind `onlyOwner` and intended solely for system-level operations:

- **Treasury cleanup**: Burning dust or residual sUSDC after migration or consolidation.
- **Emergency response**: Removing tokens in edge-case exploits or unrecoverable errors.
- **Manual corrections**: Fixing token allocations in tightly controlled environments.

It is not available to end users and cannot be used for arbitrary token seizure.

## Governance Considerations

Burning requires high trust in the executing entity. To mitigate abuse or misconfiguration:

- The contract should be controlled by a multisig wallet (e.g., Gnosis Safe).
- Burn usage should be subject to proposal-review-execute governance flow.
- Ideally, the burn action is auditable via event logs (`StakedTokensBurned`).

## No Algorithmic Supply Reduction

There is no automatic “deflation” or supply-reduction logic. Burn operations are always manual, rare, and intentional. SoulPeg avoids artificial scarcity mechanics in favor of transparent administrative tooling.

## Complementary Controls

In addition to the `burn()` function, the protocol includes:

- `earlyRedeem()`: Converts sUSDC back to USDC and burns the token
- `airdrop()`: Transfers sUSDC from the treasury to users as part of distribution events
- `pause()`: Halts critical mint or transfer logic if necessary

These mechanisms allow the protocol to adjust supply surfaces reactively without relying on economic games or token speculation.

## Summary

Burning in SoulPeg is a governance tool, not a user action. It is part of a broader commitment to responsible supply management, controlled issuance, and defense against edge-case imbalances. By making burn deliberate and gated, the protocol ensures maximum flexibility with minimal abuse potential.