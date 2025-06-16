


# Transfer Restrictions

SoulPeg is built around the concept of soul-bound tokens—assets that are non-transferable by default. This design introduces strong guarantees around protocol behavior and reward eligibility, and helps ensure that tokenized positions cannot be sold, traded, or used in exploitative financial loops.

## Non-Transferable by Default

sUSDC tokens are non-transferable unless the holding address is explicitly unlocked. This restriction is enforced at the contract level through a custom `_update()` override, which acts on every transfer attempt.

Allowed cases:
- Minting (`from == address(0)`)
- Burning (`to == address(0)`)
- Transfers from/to whitelisted DEX or system pools
- Transfers between fully unlocked wallets

All other transfers are reverted with `Locked: transfer disabled`.

## Unlock Requirement

Even after the lock period expires, users must manually call `unlock()` to transition their address to a transferable state. This prevents unintended transfers and provides additional protection against automatic execution via bots or malicious contracts.

## Whitelisted DEX Support

Certain DEX addresses or liquidity pools can be whitelisted using the `setDex()` function. This allows approved external systems to interact with sUSDC in a tightly controlled manner, enabling future integrations without compromising protocol security.

## Special Addresses

The protocol supports a list of special addresses (`isSpecialAddress`) that are permanently exempt from transfer restrictions. These are typically used for:
- Treasury wallets
- Liquidity provisioning contracts
- Internal operational accounts

## Approvals and Restrictions

The `approve()` function is also gated:
- Unlocked users can approve freely
- Locked users can only approve if the spender is a whitelisted DEX
- Owner can always approve

This prevents locked tokens from being misused in protocols or contracts the protocol does not recognize or control.

## Summary

Transfer restrictions are not a bug—they are the core feature. SoulPeg ensures that token movement only occurs under intentional and authorized circumstances. This preserves staking integrity, mitigates attack vectors, and reinforces user accountability throughout the staking lifecycle.