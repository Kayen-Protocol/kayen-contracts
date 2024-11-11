import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying KayenToken with the account:", deployer.address);

  // Set deployment parameters
  const maxSupply = ethers.utils.parseEther("88000000"); // 88 million KAYEN
  const initialSupply = ethers.utils.parseEther("5000000"); // 10 million KAYEN
  const initialEmissionRate = ethers.utils.parseEther("0.01"); // 0.01 KAYEN per second
  const treasuryAddress = "0x86d36bd2EEfB7974B9D0720Af3418FC7Ca5C8897"; // Replace with actual treasury address

  // Deploy KayenToken
  const KayenToken = await ethers.getContractFactory("KayenToken");
  const kayenToken = await KayenToken.deploy(maxSupply, initialSupply, initialEmissionRate, treasuryAddress);

  await kayenToken.deployed();

  console.log("KayenToken deployed to:", kayenToken.address);

  // Optional: Set up initial configurations
  // const tx1 = await kayenToken.initializeMasterAddress("0x0987654321098765432109876543210987654321"); // Replace with actual master address
  // await tx1.wait();
  // console.log("Master address initialized");

  // const currentTimestamp = Math.floor(Date.now() / 1000);
  // const emissionStartTime = currentTimestamp + 3600; // Start emission in 1 hour
  // const tx2 = await kayenToken.initializeEmissionStart(emissionStartTime);
  // await tx2.wait();
  // console.log("Emission start time set to:", emissionStartTime);

  console.log("KayenToken deployment and initialization completed");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });