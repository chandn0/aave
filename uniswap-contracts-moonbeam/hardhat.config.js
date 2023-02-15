/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

// Change private keys accordingly - ONLY FOR DEMOSTRATION PURPOSES - PLEASE STORE PRIVATE KEYS IN A SAFE PLACE
// Export your private key as
//       export PRIVKEY=0x.....


module.exports = {
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {},
    buildbear: {
      url: "https://rpc.dev.buildbear.io/Awful_Owen_Lars_9745de07",
      accounts: ["5849c78835ad2825b86fd1537bfd6ff9414a40f45598760234e42e05eba1c654"],
      // url: "https://rpc.dev.buildbear.io/Naughty_Ratts_Tyerel_abcc8bba",
    },


  },
  solidity: {
    compilers: [
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  etherscan: {
    apiKey: {
      buildbear: "5ded353f2a028fdb93ee",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 8428,
        urls: {
          apiURL:
            "https://rpc.dev.buildbear.io/verify/etherscan/Awful_Owen_Lars_9745de07",
          browserURL: "https://explorer.dev.buildbear.io/Awful_Owen_Lars_9745de07",
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000000000,
  },
};
