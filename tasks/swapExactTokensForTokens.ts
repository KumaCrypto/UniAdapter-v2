/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";

const contractAddress = "0xC7f25a596623bF5Bd972350c30865279B71d72D2";

task(
  "swapExactTokensForTokens",
  "Exchanges the exact number of tokens for as many output tokens as possible"
)
  .addParam("amountIn", "Incoming Token Value")
  .addParam("amountOutMin", "Minimum number of tokens to receive")
  .addParam("path", "The path of exchange addresses")
  .addParam("to", "addressee of accrual")
  .addParam(
    "deadline",
    "Maximum transaction execution time threshold in seconds"
  )
  .setAction(async (taskArgs, hre) => {
    const adapter = await hre.ethers.getContractAt("Adapter", contractAddress);

    await adapter.swapExactTokensForTokens(
      taskArgs.amountIn,
      taskArgs.amountOutMin,
      taskArgs.path,
      taskArgs.to,
      taskArgs.amountBMin,
      taskArgs.deadline
    );
  });
