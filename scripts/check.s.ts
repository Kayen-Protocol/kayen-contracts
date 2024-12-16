import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

 const KayenTokenAddress = "0x8c0b6ea89DABA6516df9437a60cA481501781606";
  console.log("Deploying KayenToken with the account:", deployer.address);

  // Deploy KayenToken
  const KayenToken = await ethers.getContractFactory("KayenToken");
  const kayenToken = await KayenToken.attach(KayenTokenAddress);

  const balance = await kayenToken.balanceOf(deployer.address);
  const maxSupply = await kayenToken.MAX_SUPPLY_LIMIT();
  const totalSupply = await kayenToken.totalSupply();
  const initialEmissionRate = await kayenToken.MAX_EMISSION_RATE();
  const emissionRate = await kayenToken.emissionRate();
  const owner = await kayenToken.owner();
  console.log("Balance of deployer:", ethers.utils.formatEther(balance));
  console.log("Max supply:", ethers.utils.formatEther(maxSupply));
  console.log("Total supply:", ethers.utils.formatEther(totalSupply));
  console.log("Initial emission rate:", ethers.utils.formatEther(initialEmissionRate));
  console.log("Emission rate:", ethers.utils.formatEther(emissionRate));
  console.log("Owner:", owner);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat run scripts/check.s.ts --network chiliz
