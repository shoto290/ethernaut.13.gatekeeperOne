import { ethers } from "hardhat";

const ETHERNAUT_ADDRESS = "";

async function main() {
  // Deploy the WorkBuilding contract
  const WorkBuilding = await ethers.getContractFactory("WorkBuilding");
  const workBuilding = await WorkBuilding.deploy({
    gasLimit: 1000000,
  });
  console.log("Deploy WorkBuilding contract at", workBuilding.address);

  const goToLastFloorTx = await workBuilding.goToLastFloor(ETHERNAUT_ADDRESS);
  await goToLastFloorTx.wait();
  console.log("Move to the last floor, tx:", goToLastFloorTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
