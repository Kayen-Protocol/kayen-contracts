import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    chiliz: {
      allowUnlimitedContractSize: true,
      url: "https://rpc.ankr.com/chiliz",
      chainId: 88888,
      accounts: [process.env.MAINNET_KEY],
      gas: "auto",
      gasPrice: "auto",
      txFeeCap: "100000000000000000000000000", // 0.1 ether
      // txGasPrice: 50000000000, // Increase this value to allow higher transaction fees
      runs: 0,
    },
    spicy: {
      allowUnlimitedContractSize: true,
      url: "https://spicy-rpc.chiliz.com/",
      chainId: 88882,
      accounts: [process.env.MAINNET_KEY],
      gas: "auto",
      gasPrice: "auto",
      txFeeCap: "100000000000000000000000000", // 0.1 ether
      runs: 0,
    },
  },
  mocha: {
    timeout: 400000000,
  },
};

export default config;