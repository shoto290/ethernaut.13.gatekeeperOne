import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  // Get, destroy and send to the Ethernaut contract
  const Destroyable = await ethers.getContractFactory("Destroyable");
  const destroyable = await Destroyable.deploy(ETHERNAUT_ADDRESS, { value: ethers.utils.parseEther("0.0001") });
  console.log("Deploy Destroyable contract at", destroyable.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
