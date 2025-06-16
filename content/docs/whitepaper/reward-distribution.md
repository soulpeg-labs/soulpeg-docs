


# Reward Distribution

SoulPeg uses a manual, governance-controlled mechanism for distributing yield to participants. Rewards are issued in sUSDC, follow the same locking mechanics as initial deposits, and are designed to prevent abuse or inflation-based dilution.

## Governance-Minted Rewards

All rewards are minted via the `rewardMint()` function, which is restricted to the protocol owner (typically a multisig). There is no automatic or scheduled emission. This function allows precise control over:

- Who receives rewards
- How much they receive
- When rewards are distributed

This design enables targeted reward programs and full accountability for emissions.

## Lock Inheritance

Newly minted rewards inherit the recipient’s current lock state:

- If the address is locked: rewards are subject to the same `unlockAt` timer
- If the address is new or never locked: a 1-second dummy lock is applied, requiring manual unlock

This ensures that all rewards pass through the same friction as standard deposits, preserving the soulbound nature of sUSDC.

## Non-Compounding by Design

SoulPeg does not implement rebasing or auto-compounding. All yield must be explicitly minted and distributed. This protects the protocol from exponential supply growth and allows rewards to remain sustainable and traceable.

## No “Claim” Function

There is no user-initiated claim process. Rewards are pushed directly to the user’s wallet by the protocol. This minimizes gas costs and eliminates race conditions or claim front-running vulnerabilities.

## Monitoring and Transparency

All reward distributions emit the `RewardsDistributed(address,uint256)` event and can be tracked via on-chain analytics tools. Frontends and dashboards can use this event stream to display historical and real-time reward data.

## Summary

SoulPeg’s reward model is non-inflationary, accountable, and governance-driven. It emphasizes control, transparency, and fairness—ensuring that yield serves committed users without exposing the protocol to systemic reward abuse.