import { ethers, run } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();

  // Data for example, change for yourself
  const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const _Adapter = await ethers.getContractFactory("Adapter");

  const Adapter = await _Adapter.deploy(ROUTER_ADDRESS, FACTORY_ADDRESS);
  await Adapter.deployed();

  await run(`verify:verify`, {
    address: Adapter.address,
    contract: "contracts/Adapter.sol:Adapter",
    constructorArguments: [ROUTER_ADDRESS, FACTORY_ADDRESS],
  });

  console.log(`
    Deployed in rinkeby
    =================
    "Adapter" contract address: ${Adapter.address}
    ${signer.address} - deployed this contracts
  `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
