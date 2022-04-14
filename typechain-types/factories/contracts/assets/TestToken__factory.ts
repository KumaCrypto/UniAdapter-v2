/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestToken,
  TestTokenInterface,
} from "../../../contracts/assets/TestToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060408051808201825260098152682a32b9ba2a37b5b2b760b91b602080830191825283518085019094526002845261151560f21b9084015281519192916200005d9160039162000265565b5080516200007390600490602084019062000265565b505050620000ad336200008b620000c060201b60201c565b6200009890600a6200041e565b620000a790620186a062000436565b620000c5565b620000ba600033620001ae565b620004af565b601290565b6001600160a01b038216620001205760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b806002600082825462000134919062000458565b90915550506001600160a01b038216600090815260208190526040812080548392906200016390849062000458565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35b5050565b620001ba828262000238565b620001aa5760008281526005602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001f43390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526005602090815260408083206001600160a01b038516845290915290205460ff165b92915050565b828054620002739062000473565b90600052602060002090601f016020900481019282620002975760008555620002e2565b82601f10620002b257805160ff1916838001178555620002e2565b82800160010185558215620002e2579182015b82811115620002e2578251825591602001919060010190620002c5565b50620002f0929150620002f4565b5090565b5b80821115620002f05760008155600101620002f5565b634e487b7160e01b600052601160045260246000fd5b600181815b80851115620003625781600019048211156200034657620003466200030b565b808516156200035457918102915b93841c939080029062000326565b509250929050565b6000826200037b575060016200025f565b816200038a575060006200025f565b8160018114620003a35760028114620003ae57620003ce565b60019150506200025f565b60ff841115620003c257620003c26200030b565b50506001821b6200025f565b5060208310610133831016604e8410600b8410161715620003f3575081810a6200025f565b620003ff838362000321565b80600019048211156200041657620004166200030b565b029392505050565b60006200042f60ff8416836200036a565b9392505050565b60008160001904831182151516156200045357620004536200030b565b500290565b600082198211156200046e576200046e6200030b565b500190565b600181811c908216806200048857607f821691505b602082108103620004a957634e487b7160e01b600052602260045260246000fd5b50919050565b6118fa80620004bf6000396000f3fe608060405234801561001057600080fd5b50600436106101825760003560e01c806342966c68116100d8578063a217fddf1161008c578063d539139311610066578063d539139314610354578063d547741f1461037b578063dd62ed3e1461038e57600080fd5b8063a217fddf14610326578063a457c2d71461032e578063a9059cbb1461034157600080fd5b806379cc6790116100bd57806379cc6790146102c557806391d14854146102d857806395d89b411461031e57600080fd5b806342966c681461027c57806370a082311461028f57600080fd5b8063248a9ca31161013a57806336568abe1161011457806336568abe14610243578063395093511461025657806340c10f191461026957600080fd5b8063248a9ca3146101fc5780632f2ff15d1461021f578063313ce5671461023457600080fd5b8063095ea7b31161016b578063095ea7b3146101c457806318160ddd146101d757806323b872dd146101e957600080fd5b806301ffc9a71461018757806306fdde03146101af575b600080fd5b61019a6101953660046114ea565b6103d4565b60405190151581526020015b60405180910390f35b6101b761046d565b6040516101a69190611558565b61019a6101d23660046115d2565b6104ff565b6002545b6040519081526020016101a6565b61019a6101f73660046115fc565b610517565b6101db61020a366004611638565b60009081526005602052604090206001015490565b61023261022d366004611651565b61053b565b005b604051601281526020016101a6565b610232610251366004611651565b610566565b61019a6102643660046115d2565b61061e565b6102326102773660046115d2565b61066a565b61023261028a366004611638565b61069f565b6101db61029d36600461167d565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6102326102d33660046115d2565b6106ac565b61019a6102e6366004611651565b600091825260056020908152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b6101b76106c1565b6101db600081565b61019a61033c3660046115d2565b6106d0565b61019a61034f3660046115d2565b6107a1565b6101db7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b610232610389366004611651565b6107af565b6101db61039c366004611698565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061046757507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606003805461047c906116c2565b80601f01602080910402602001604051908101604052809291908181526020018280546104a8906116c2565b80156104f55780601f106104ca576101008083540402835291602001916104f5565b820191906000526020600020905b8154815290600101906020018083116104d857829003601f168201915b5050505050905090565b60003361050d8185856107d5565b5060019392505050565b600033610525858285610988565b610530858585610a5f565b506001949350505050565b6000828152600560205260409020600101546105578133610d12565b6105618383610de4565b505050565b73ffffffffffffffffffffffffffffffffffffffff81163314610610576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b61061a8282610ed8565b5050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919061050d9082908690610665908790611744565b6107d5565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66106958133610d12565b6105618383610f93565b6106a933826110b3565b50565b6106b7823383610988565b61061a82826110b3565b60606004805461047c906116c2565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919083811015610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610607565b61053082868684036107d5565b60003361050d818585610a5f565b6000828152600560205260409020600101546107cb8133610d12565b6105618383610ed8565b73ffffffffffffffffffffffffffffffffffffffff8316610877576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610607565b73ffffffffffffffffffffffffffffffffffffffff821661091a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610607565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a595781811015610a4c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610607565b610a5984848484036107d5565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8316610b02576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610607565b73ffffffffffffffffffffffffffffffffffffffff8216610ba5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610607565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610c5b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610607565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208190526040808220858503905591851681529081208054849290610c9f908490611744565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d0591815260200190565b60405180910390a3610a59565b600082815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff1661061a57610d6a8173ffffffffffffffffffffffffffffffffffffffff1660146112a0565b610d758360206112a0565b604051602001610d8692919061175c565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261060791600401611558565b600082815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff1661061a57600082815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055610e7a3390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff161561061a57600082815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b73ffffffffffffffffffffffffffffffffffffffff8216611010576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610607565b80600260008282546110229190611744565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152602081905260408120805483929061105c908490611744565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216611156576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610607565b73ffffffffffffffffffffffffffffffffffffffff82166000908152602081905260409020548181101561120c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610607565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604081208383039055600280548492906112489084906117dd565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b606060006112af8360026117f4565b6112ba906002611744565b67ffffffffffffffff8111156112d2576112d2611831565b6040519080825280601f01601f1916602001820160405280156112fc576020820181803683370190505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061133357611333611860565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061139657611396611860565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006113d28460026117f4565b6113dd906001611744565b90505b600181111561147a577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061141e5761141e611860565b1a60f81b82828151811061143457611434611860565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c936114738161188f565b90506113e0565b5083156114e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610607565b9392505050565b6000602082840312156114fc57600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146114e357600080fd5b60005b8381101561154757818101518382015260200161152f565b83811115610a595750506000910152565b602081526000825180602084015261157781604085016020870161152c565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b803573ffffffffffffffffffffffffffffffffffffffff811681146115cd57600080fd5b919050565b600080604083850312156115e557600080fd5b6115ee836115a9565b946020939093013593505050565b60008060006060848603121561161157600080fd5b61161a846115a9565b9250611628602085016115a9565b9150604084013590509250925092565b60006020828403121561164a57600080fd5b5035919050565b6000806040838503121561166457600080fd5b82359150611674602084016115a9565b90509250929050565b60006020828403121561168f57600080fd5b6114e3826115a9565b600080604083850312156116ab57600080fd5b6116b4836115a9565b9150611674602084016115a9565b600181811c908216806116d657607f821691505b60208210810361170f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561175757611757611715565b500190565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161179481601785016020880161152c565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516117d181602884016020880161152c565b01602801949350505050565b6000828210156117ef576117ef611715565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561182c5761182c611715565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008161189e5761189e611715565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019056fea26469706673582212208f74a6262c6269fbc0c4874a932e785be33bd4d6a2e8053809920c30571c057664736f6c634300080d0033";

type TestTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestToken__factory extends ContractFactory {
  constructor(...args: TestTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestToken> {
    return super.deploy(overrides || {}) as Promise<TestToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestToken {
    return super.attach(address) as TestToken;
  }
  override connect(signer: Signer): TestToken__factory {
    return super.connect(signer) as TestToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestTokenInterface {
    return new utils.Interface(_abi) as TestTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestToken {
    return new Contract(address, _abi, signerOrProvider) as TestToken;
  }
}