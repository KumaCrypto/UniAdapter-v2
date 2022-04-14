/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";

const contractAddress = "0xC7f25a596623bF5Bd972350c30865279B71d72D2";

task(
  "getAmountsOut",
  "Returns the number of tokens you will receive if you enter X number of tokens"
)
  .addParam("amountIn", "Incoming Token Value")
  .addParam("path", "Token Exchange Path")
  .setAction(async (taskArgs, hre) => {
    const adapter = await hre.ethers.getContractAt("Adapter", contractAddress);

    await adapter.getAmountsOut(taskArgs.amountIn, taskArgs.path);
  });
