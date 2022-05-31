# Gear DAO dApp

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/gear-academy/dao-app)

Decentralized Autonomous Organization (DAO) operates without central authority or control. It is community-driven and all the decisions are made through proposals in which different members are required to vote.

It's Ready-to-Use application based on two different smart-contracts:

- Fundible Token [https://github.com/gear-academy/fungible-token](https://github.com/gear-academy/fungible-token) which permit to create utility token `DAO`
- DAO contract [https://github.com/gear-academy/dao-light](https://github.com/gear-academy/dao-light)

# Getting Started

Configure basic dApp in .env:

```shell
REACT_APP_NETWORK
REACT_APP_CONTRACT_ERC
REACT_APP_CONTRACT_DAO
```

- `REACT_APP_NETWORK` is Gear network address (wss://rpc-node.gear-tech.io:443)
- `REACT_APP_CONTRACT_ERC` is Fundible Token contract address
- `RREACT_APP_CONTRACT_DAO` is DAO contract address

An example is available: [here](https://github.com/gear-academy/dao-app/blob/master/.env.example)

## To run

To install required dependencies:

```shell
yarn
```

To run:

```shell
yarn run start
```

# License

The source code is licensed under GPL v3.0 license.
See [LICENSE](LICENSE) for details.
