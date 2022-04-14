/* eslint-disable prettier/prettier */
/* eslint-disable node/no-missing-import */
/* eslint-disable camelcase */

import { expect } from "chai";
import { ethers, network } from "hardhat";
import { BigNumber } from "bignumber.js";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  IUniswapV2Router02,
  IUniswapV2Factory,
  Adapter,
  TestToken,
  IUniswapV2Pair,
  TestToken__factory,
  Adapter__factory,
} from "../typechain-types";

const MIN_LIQUIDITY = 10 ** 3; // UniswapV2Pair minimum liqudity
BigNumber.config({ EXPONENTIAL_AT: 60 }); // configure big number

async function getCurrentTime() {
  return (
    await ethers.provider.getBlock(await ethers.provider.getBlockNumber())
  ).timestamp;
}

describe("Testing adapter with fork", () => {
  let router: IUniswapV2Router02;
  let factory: IUniswapV2Factory;
  let token: TestToken;
  let token2: TestToken;
  let adapter: Adapter;
  let lptoken: IUniswapV2Pair;

  let clean: any;
  let signers: SignerWithAddress[];
  let deadline: number;
  const tokenAmount: number = 100;
  const parsedTokenAmount = ethers.utils.parseEther("100");
  const minParsedTokenAmount = ethers.utils.parseEther("90");
  const parsedOne = ethers.utils.parseEther("1");

  before(async () => {
    deadline = (await getCurrentTime()) + 100;

    // get signers
    signers = await ethers.getSigners();

    // get Uniswap Router and Factory
    router = await ethers.getContractAt(
      "IUniswapV2Router02",
      process.env.ROUTER_ADDRESS as string
    );
    factory = await ethers.getContractAt(
      "IUniswapV2Factory",
      process.env.FACTORY_ADDRESS as string
    );

    // deploy
    token = await new TestToken__factory(signers[0]).deploy();
    token2 = await new TestToken__factory(signers[0]).deploy();
    adapter = await new Adapter__factory(signers[0]).deploy(
      router.address,
      factory.address
    );

    // approve adapter;
    await token.approve(adapter.address, ethers.constants.MaxUint256);
    await token2.approve(adapter.address, ethers.constants.MaxUint256);

    // get pair
    lptoken = await ethers.getContractAt(
      "IUniswapV2Pair",
      "0x48a0DA291b2FE05de795857DDC313D16d1a57dcf"
    );

    // take a world-state snapshot
    clean = await network.provider.request({
      method: "evm_snapshot",
      params: [],
    });
  });

  describe("addLiquidity", () => {
    afterEach(async () => {
      // clean state after test case
      await network.provider.request({
        method: "evm_revert",
        params: [clean],
      });
      // take a world-state snapshot
      clean = await network.provider.request({
        method: "evm_snapshot",
        params: [],
      });
    });

    it("addLiquidity: Pool created", async () => {
      await adapter.addLiquidity(
        token.address,
        token2.address,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        signers[0].address,
        deadline
      );

      expect(await adapter.getPair(token.address, token2.address)).to.eq(
        lptoken.address
      );
    });

    it("addLiquidity: Sent the correct number of tokens to the balance", async () => {
      await adapter.addLiquidity(
        token.address,
        token2.address,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        signers[0].address,
        deadline
      );

      expect(await lptoken.balanceOf(signers[0].address)).to.eq(
        ethers.utils
          .parseUnits(
            Math.sqrt(tokenAmount * tokenAmount).toString(),
            await lptoken.decimals()
          )
          .sub(MIN_LIQUIDITY)
      );
    });

    it("addLiquidity: To emit LiquidityAdded", async () => {
      await expect(
        adapter.addLiquidity(
          token.address,
          token2.address,
          parsedTokenAmount,
          parsedTokenAmount,
          parsedTokenAmount,
          parsedTokenAmount,
          signers[0].address,
          deadline
        )
      )
        .to.emit(adapter, "LiquidityAdded")
        .withArgs(
          signers[0].address,
          signers[0].address,
          token.address,
          token2.address
        );
    });
  });

  describe("removeLiquidity", () => {
    beforeEach(async () => {
      await adapter.addLiquidity(
        token.address,
        token2.address,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        signers[0].address,
        deadline
      );
      await lptoken.approve(adapter.address, ethers.constants.MaxUint256);
    });

    afterEach(async () => {
      // clean state after test case
      await network.provider.request({
        method: "evm_revert",
        params: [clean],
      });
      // take a world-state snapshot
      clean = await network.provider.request({
        method: "evm_snapshot",
        params: [],
      });
    });

    it("removeLiquidity: LP tokens burned", async () => {
      const liquidity = await lptoken.balanceOf(signers[0].address);
      await adapter.removeLiquidity(
        token.address,
        token2.address,
        liquidity,
        minParsedTokenAmount,
        minParsedTokenAmount,
        signers[0].address,
        deadline
      );

      expect(await lptoken.balanceOf(signers[0].address)).to.eq(0);
    });

    it("removeLiquidity: To emit LiquidityRemoved", async () => {
      const liquidity = await lptoken.balanceOf(signers[0].address);
      await expect(
        adapter.removeLiquidity(
          token.address,
          token2.address,
          liquidity,
          minParsedTokenAmount,
          minParsedTokenAmount,
          signers[0].address,
          deadline
        )
      )
        .to.emit(adapter, "LiquidityRemoved")
        .withArgs(
          signers[0].address,
          signers[0].address,
          lptoken.address,
          liquidity
        );
    });
  });

  describe("swapExactTokensForTokens", () => {
    beforeEach(async () => {
      await adapter.addLiquidity(
        token.address,
        token2.address,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        signers[0].address,
        deadline
      );

      await lptoken.approve(adapter.address, ethers.constants.MaxUint256);
    });

    afterEach(async () => {
      // clean state after test case
      await network.provider.request({
        method: "evm_revert",
        params: [clean],
      });
      // take a world-state snapshot
      clean = await network.provider.request({
        method: "evm_snapshot",
        params: [],
      });
    });

    it("swapExactTokensForTokens: Exchanges tokens correctly", async () => {
      const path: string[] = [token.address, token2.address];
      const balanceBefore = await token.balanceOf(signers[0].address);

      await adapter.swapExactTokensForTokens(
        parsedOne,
        0,
        path,
        signers[0].address,
        deadline
      );

      const balanceAfter = await token.balanceOf(signers[0].address);
      expect(balanceBefore.sub(parsedOne)).to.eq(balanceAfter);
    });

    it("swapExactTokensForTokens: To emit SwappedExactTokensForTokens", async () => {
      const path: string[] = [token.address, token2.address];

      await expect(
        adapter.swapExactTokensForTokens(
          parsedOne,
          0,
          path,
          signers[0].address,
          deadline
        )
      )
        .to.emit(adapter, "SwappedExactTokensForTokens")
        .withArgs(signers[0].address, signers[0].address, path, parsedOne);
    });
  });

  describe("swapTokensForExactTokens", () => {
    beforeEach(async () => {
      await adapter.addLiquidity(
        token.address,
        token2.address,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        signers[0].address,
        deadline
      );
      await lptoken.approve(adapter.address, ethers.constants.MaxUint256);
    });

    afterEach(async () => {
      // clean state after test case
      await network.provider.request({
        method: "evm_revert",
        params: [clean],
      });
      // take a world-state snapshot
      clean = await network.provider.request({
        method: "evm_snapshot",
        params: [],
      });
    });

    it("swapTokensForExactTokens: Exchanges tokens correctly", async () => {
      const path: string[] = [token.address, token2.address];
      const balanceBefore = await token2.balanceOf(signers[0].address);

      await adapter.swapTokensForExactTokens(
        parsedOne,
        parsedTokenAmount,
        path,
        signers[0].address,
        deadline
      );

      const balanceAfter = await token2.balanceOf(signers[0].address);
      expect(balanceBefore.add(parsedOne)).to.eq(balanceAfter);
    });

    it("swapTokensForExactTokens: To emit SwappedTokensForExactTokens", async () => {
      const path: string[] = [token.address, token2.address];
      const amounts = await adapter.getAmountsIn(parsedOne, path);

      await expect(
        adapter.swapTokensForExactTokens(
          parsedOne,
          parsedTokenAmount,
          path,
          signers[0].address,
          deadline
        )
      )
        .to.emit(adapter, "SwappedTokensForExactTokens")
        .withArgs(signers[0].address, signers[0].address, path, amounts);
    });
  });

  describe("GetFunctions", () => {
    beforeEach(async () => {
      await adapter.addLiquidity(
        token.address,
        token2.address,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        parsedTokenAmount,
        signers[0].address,
        deadline
      );
      await lptoken.approve(adapter.address, ethers.constants.MaxUint256);
    });

    afterEach(async () => {
      // clean state after test case
      await network.provider.request({
        method: "evm_revert",
        params: [clean],
      });
      // take a world-state snapshot
      clean = await network.provider.request({
        method: "evm_snapshot",
        params: [],
      });
    });

    it("getAmountsOut: Returns correct value", async () => {
      const path: string[] = [token.address, token2.address];
      const balanceBefore = await token2.balanceOf(signers[0].address);
      const calculatedValue = await adapter.getAmountsOut(parsedOne, path);

      await adapter.swapExactTokensForTokens(
        parsedOne,
        0,
        path,
        signers[0].address,
        deadline
      );

      const balanceAfter = await token2.balanceOf(signers[0].address);
      expect(balanceBefore.add(calculatedValue[1])).to.eq(balanceAfter);
    });

    it("getAmountsIn: Returns correct value", async () => {
      const path: string[] = [token.address, token2.address];
      const balanceBefore = await token.balanceOf(signers[0].address);
      const calculatedValue = await adapter.getAmountsIn(parsedOne, path);

      await adapter.swapTokensForExactTokens(
        calculatedValue[1],
        parsedTokenAmount,
        path,
        signers[0].address,
        deadline
      );

      const balanceAfter = await token.balanceOf(signers[0].address);
      expect(balanceBefore.sub(calculatedValue[0])).to.eq(balanceAfter);
    });
  });
});
