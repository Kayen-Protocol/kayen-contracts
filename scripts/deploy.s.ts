import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying KayenToken with the account:", deployer.address);

  // Set deployment parameters
  const maxSupply = ethers.utils.parseEther("88000000"); // 88 million KAYEN
  const initialSupply = ethers.utils.parseEther("70400000"); // 70.4 million KAYEN (80% of maxSupply)
  const initialEmissionRate = ethers.utils.parseEther("0"); // 0 KAYEN per second
  const treasuryAddress = "0x80B714e2dd42611e4DeA6BFe2633210bD9191bEd"; // Replace with actual treasury address
  console.log("maxSupply", maxSupply);
  console.log("initialSupply", initialSupply);
  console.log("initialEmissionRate", initialEmissionRate);
  console.log("treasuryAddress", treasuryAddress);

  // Deploy KayenToken
  const KayenToken = await ethers.getContractFactory("KayenToken");
  const kayenToken = await KayenToken.deploy(maxSupply, initialSupply, initialEmissionRate, treasuryAddress);
  await kayenToken.deployed();

  console.log("KayenToken deployed to:", kayenToken.address);

  const tx = await kayenToken.transferOwnership(treasuryAddress);
  await tx.wait();
  console.log("Ownership transferred to:", treasuryAddress);
  
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

// npx hardhat run scripts/deploy.ts --network chiliz