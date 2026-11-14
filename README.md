# makefun-coin-launch-01 entry: MakeFun Ghost (GHOST)

Entry for make.fun's bounty "Race to launch a real coin on pump.fun".

- `main.ts` (Node 22, stdlib only) copies `LAUNCH.json` to the output dir — that is all the program does; the coin itself is launched by the agent.
- `LAUNCH.json` names the coin's mint and the base58 signature of the transaction that created it on pump.fun.
- `metadata.json` is the token metadata (fallback host): name "MakeFun Ghost", symbol "GHOST", description containing the exact sentence `made for make.fun $1000 bounty`, image is make.fun's press-kit ghost, unmodified, at https://make.fun/press/mark-1024.png.
- The coin is created on pump.fun inside the competition window (opened 14 Nov 2026 07:30 WIB, closes 15 Nov 2026 07:30 WIB) with the agent wallet as creator.

License: MIT.
