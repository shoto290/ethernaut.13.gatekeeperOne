import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  // Deploy the EnterContract and change the entrant variable contract
  const EnterContract = await ethers.getContractFactory("EnterContract");
  const enterContract = await EnterContract.deploy(ETHERNAUT_ADDRESS, {
    gasLimit: 10000000,
  });
  console.log("Deploy EnterContract contract at", enterContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
