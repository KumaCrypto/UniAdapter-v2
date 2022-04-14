/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";

const contractAddress = "0xC7f25a596623bF5Bd972350c30865279B71d72D2";

task(
  "swapTokensForExactTokens",
  "Exchanges as few tokens as possible for the exact number of tokens"
)
  .addParam("amountOut", "Outcoming Token Value")
  .addParam("amountInMax", "Maximum number of tokens to send")
  .addParam("path", "The path of exchange addresses")
  .addParam("to", "addressee of accrual")
  .addParam(
    "deadline",
    "Maximum transaction execution time threshold in seconds"
  )
  .setAction(async (taskArgs, hre) => {
    const adapter = await hre.ethers.getContractAt("Adapter", contractAddress);

    await adapter.swapTokensForExactTokens(
      taskArgs.amountOut,
      taskArgs.amountInMax,
      taskArgs.path,
      taskArgs.to,
      taskArgs.amountBMin,
      taskArgs.deadline
    );
  });
