/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";

const contractAddress = "0xC7f25a596623bF5Bd972350c30865279B71d72D2";

task("getPair", "Returns the address of the pair")
  .addParam("tokenA", "Address of tokenA")
  .addParam("tokenB", "Address of tokenB")
  .setAction(async (taskArgs, hre) => {
    const adapter = await hre.ethers.getContractAt("Adapter", contractAddress);

    await adapter.getPair(taskArgs.tokenA, taskArgs.tokenB);
  });
