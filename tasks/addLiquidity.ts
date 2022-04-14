/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";

const contractAddress = "0xC7f25a596623bF5Bd972350c30865279B71d72D2";

task("addLiquidity", "Add liquidity to the pool")
  .addParam("tokenA", "Address of tokenA")
  .addParam("tokenB", "Address of tokenB")
  .addParam("amountADesired", "The desired number of tokens to receive")
  .addParam("amountBDesired", "The desired number of tokens to receive")
  .addParam("amountAMin", "Minimum tokenA amount")
  .addParam("amountBMin", "Minimum tokenB amount")
  .addParam("to", "Recipient of the liquidity tokens")
  .addParam(
    "deadline",
    "Maximum transaction execution time threshold in seconds"
  )
  .setAction(async (taskArgs, hre) => {
    const adapter = await hre.ethers.getContractAt("Adapter", contractAddress);

    await adapter.addLiquidity(
      taskArgs.tokenA,
      taskArgs.tokenB,
      taskArgs.amountADesired,
      taskArgs.amountBDesired,
      taskArgs.amountAMin,
      taskArgs.amountBMin,
      taskArgs.to,
      taskArgs.deadline
    );
  });
