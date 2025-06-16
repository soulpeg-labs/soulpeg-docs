


# Flash-Loan Resistance

Flash loans are a major threat vector in DeFi, allowing attackers to borrow large sums of tokens without collateral and exploit vulnerable systems within a single transaction. SoulPeg is explicitly designed to mitigate such risks through a combination of architectural and protocol-level decisions.

## No Transferability = No Arbitrage

Because sUSDC is non-transferable while locked, it cannot be moved between accounts or protocols. This breaks the core requirement of flash loan strategies, which rely on rapid token movement to extract value. Even if tokens are borrowed, they cannot be used for arbitrage, recursive borrowing, or liquidity mining exploits.

## Lock Enforcement

All sUSDC minted through deposits or reward distributions is subject to a time-based lock. During the lock period:
- Transfers are disabled unless the address is explicitly unlocked
- Approvals are restricted unless interacting with whitelisted DEXs or the user is unlocked
- Tokens cannot be moved or dumped in mass within a flash loan window

## Deliberate Unlock Step

The requirement to call `unlock()` after lock expiry adds a manual gate between holding and transferring. This ensures that even after the time lock expires, tokens remain non-transferable until the user takes action, effectively preventing automated scripts from exploiting unlock windows.

## Protocol-Level Throttling

SoulPeg uses global daily limits to prevent large-scale manipulation:
- `DAILY_DEPOSIT_LIMIT`: caps USDC inflows per day
- `DAILY_MINT_LIMIT`: caps sUSDC issuance per day

This helps reduce the risk of coordinated attacks involving high-volume minting, such as recursive strategies or treasury draining via flash loans.

## External Call Protection

Critical functions like `depositAndMint()` and `rewardMint()` are guarded with `ReentrancyGuard` and `nonReentrant` modifiers to prevent nested calls and reentrancy exploits. Additionally, the protocol’s ability to `pause()` operations gives multisig owners time to react in extreme scenarios.

## Summary

The combination of non-transferability, delayed unlocking, daily mint limits, and reentrancy protection provides SoulPeg with strong native resistance against flash loan-based attacks. Rather than relying solely on external audits or economic incentives, the protocol enforces flash-loan safety at the most fundamental level: token movement itself.