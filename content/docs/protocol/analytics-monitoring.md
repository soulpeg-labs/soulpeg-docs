


# Analytics & Monitoring

SoulPeg provides several read-only functions to support dashboards, analytics platforms, and automated monitoring tools. These functions expose key protocol data points to enhance transparency and help users, developers, and integrators make informed decisions.

## Protocol Statistics

The `getProtocolStats()` function returns high-level information about the current state of the protocol:

- `totalSupply`: Total sUSDC in circulation
- `totalUSDCDeposited`: Aggregate USDC ever deposited
- `totalRewardsDistributed`: Total rewards minted
- `totalActiveStakers`: Count of unique staking participants
- `contractUSDCBalance`: USDC balance held by the protocol
- `isPaused`: Emergency state of the contract

These values can be polled to build charts, track growth over time, or detect anomalies.

## Daily Limits Overview

The `getDailyLimitStatus()` function provides real-time usage data for the current 24-hour cycle:

- `depositUsed` and `depositLimit`
- `mintUsed` and `mintLimit`
- `resetTime`: Timestamp when daily counters reset

This is useful for monitoring congestion, gauging protocol usage, or setting up alerting systems for threshold events.

## User-Level Insight

The following functions expose per-user analytics:

- `getUserInfo(address)`:
  - `isLocked`: Whether the user is currently locked
  - `remainingTime`: Seconds left until unlock
  - `totalBalance`: Current sUSDC balance
  - `stakedAmount`: All-time USDC deposited by user

- `getAvailableActions(address)`:
  - Boolean flags showing if user can transfer, unlock, approve, or interact with DEX

These help power user dashboards, eligibility checks, or UI state toggles.

## Events for Indexing

All key operations in the protocol emit events such as:

- `Deposited`, `Unlocked`, `RewardsDistributed`, `EarlyRedeemed`
- `DexWhitelisted`, `Paused`, `Unpaused`, `EmergencyWithdraw`

These can be indexed using The Graph, SubQuery, or any event-driven backend to provide live updates and analytics feeds.

## Summary

SoulPeg exposes comprehensive, low-cost read access to essential protocol and user data. These analytics endpoints support transparency, enable better tooling, and reduce reliance on off-chain guesswork when integrating or building on top of the protocol.