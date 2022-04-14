/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";

const contractAddress = "0xC7f25a596623bF5Bd972350c30865279B71d72D2";

task(
  "getAmountsIn",
  "Returns the number of tokens to be deposited to get the exact number of tokens"
)
  .addParam("amountOut", "The output value of the tokens you want to get")
  .addParam("path", "Token Exchange Path")
  .setAction(async (taskArgs, hre) => {
    const adapter = await hre.ethers.getContractAt("Adapter", contractAddress);

    await adapter.getAmountsIn(taskArgs.amountOut, taskArgs.path);
  });
