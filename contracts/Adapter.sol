//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./IUniswapV2Factory.sol";
import "./IUniswapV2Router02.sol";

contract Adapter {
    using SafeERC20 for IERC20;

    event LiquidityAdded(
        address indexed sender,
        address indexed to,
        address tokenA,
        address tokenB,
        uint256 tokenAAdded,
        uint256 tokenBAdded
    );

    event LiquidityRemoved(
        address indexed sender,
        address indexed to,
        IERC20 indexed pair,
        uint256 liquidity
    );

    event SwappedExactTokensForTokens(
        address indexed sender,
        address indexed to,
        address[] path,
        uint256 amountIn
    );

    event SwappedTokensForExactTokens(
        address indexed sender,
        address indexed to,
        address[] path,
        uint256[] amounts
    );

    IUniswapV2Router02 public router;
    IUniswapV2Factory public factory;

    constructor(IUniswapV2Router02 _router, IUniswapV2Factory _factory) {
        factory = _factory;
        router = _router;
    }

    // Since Uniswap's addLiquidity already has a built-in check for the existence of a liquidity pool and creates it -
    // - if it does not exist, therefore there is no createPair function in this contract.
    // To create a pool, it is enough to call the addLiquidity function.

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external {
        uint256 amountAOptimal; 
        uint256 amountBOptimal;

        IERC20(tokenA).safeTransferFrom(
            msg.sender,
            address(this),
            amountADesired
        );
        IERC20(tokenB).safeTransferFrom(
            msg.sender,
            address(this),
            amountBDesired
        );

        IERC20(tokenA).safeApprove(address(router), amountADesired);
        IERC20(tokenB).safeApprove(address(router), amountBDesired);

        (amountAOptimal, amountBOptimal,) = router.addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
        
        if (amountADesired > amountAOptimal)
            IERC20(tokenA).safeTransfer(msg.sender, amountADesired - amountAOptimal);

        if (amountBDesired > amountBOptimal)
            IERC20(tokenB).safeTransfer(msg.sender, amountBDesired - amountBOptimal);
        
        emit LiquidityAdded(msg.sender, to, tokenA, tokenB, amountAOptimal, amountBOptimal);
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external {
        IERC20 pair = IERC20(factory.getPair(tokenA, tokenB));

        pair.safeTransferFrom(msg.sender, address(this), liquidity);
        pair.safeApprove(address(router), liquidity);

        router.removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
        emit LiquidityRemoved(msg.sender, to, pair, liquidity);
    }

    // Exchanges the exact number of tokens for as many output tokens as possible
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external {
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(path[0]).safeApprove(address(router), amountIn);

        router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );
        emit SwappedExactTokensForTokens(msg.sender, to, path, amountIn);
    }

    // Exchanges as few tokens as possible for the exact number of tokens
    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external {
        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            address(this),
            amountInMax
        );
        IERC20(path[0]).safeApprove(address(router), amountInMax);

        uint256[] memory amounts = new uint256[](path.length);
        amounts = router.swapTokensForExactTokens(
            amountOut,
            amountInMax,
            path,
            to,
            deadline
        );
        IERC20(path[0]).safeTransfer(msg.sender, amountInMax - amounts[0]);
        emit SwappedTokensForExactTokens(msg.sender, to, path, amounts);
    }

    // Returns the number of tokens you will receive if you enter X number of tokens
    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory)
    {
        return router.getAmountsOut(amountIn, path);
    }

    // Returns the number of tokens to be deposited to get the exact number of tokens
    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory)
    {
        return router.getAmountsIn(amountOut, path);
    }

    // Returns the address of the pair
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address)
    {
        return factory.getPair(tokenA, tokenB);
    }
}
