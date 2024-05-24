export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'AddressEmptyCode',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'AddressInsufficientBalance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedInnerCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_minter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
    ],
    name: 'MintNFTSuccessful',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_licenseAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_licenseTokenId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address payable',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'licenseAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'licenseTokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'colectionName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalQuantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxBuy',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct StoryLaunchpadNFT721.NFTLaunchpad',
        name: 'nftLaunchpad',
        type: 'tuple',
      },
    ],
    name: 'NFTLaunchpadCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'add',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'value',
        type: 'bool',
      },
    ],
    name: 'SetOperator',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'LaunchpadInfors',
    outputs: [
      {
        internalType: 'address',
        name: 'nftAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'payToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'uriLauchpad',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'uriNFT',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'royaltyPercentage',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'royaltyAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'LaunchpadNFTArray',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'NFTLaunchpads',
    outputs: [
      {
        internalType: 'address payable',
        name: 'creator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'licenseAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'licenseTokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'colectionName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalQuantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxBuy',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'acceptPayTokens',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address payable',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'licenseAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'licenseTokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'colectionName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalQuantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxBuy',
            type: 'uint256',
          },
        ],
        internalType: 'struct StoryLaunchpadNFT721.NFTLaunchpad',
        name: '_launchpad',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'payToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'uriLauchpad',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'uriNFT',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'royaltyPercentage',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'royaltyAddress',
            type: 'address',
          },
        ],
        internalType: 'struct StoryLaunchpadNFT721.LaunchpadInfor',
        name: '_launchpadInfor',
        type: 'tuple',
      },
    ],
    name: 'createNFTSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_licenseAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'getCurrentLicensePhase',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ipAssetRegistryAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'licenseSalePhase',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'licenseTemplateAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'licenseTokenAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'licensingModuleAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_licenseAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_licenseTokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_payToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_payAmount',
        type: 'uint256',
      },
    ],
    name: 'mintNFT',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'numberOfNftSold',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_payToken',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_accept',
        type: 'bool',
      },
    ],
    name: 'setAcceptPayToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_addr',
        type: 'address',
      },
    ],
    name: 'setIpAssetRegistryAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_addr',
        type: 'address',
      },
    ],
    name: 'setLicenseTokenAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_addr',
        type: 'address',
      },
    ],
    name: 'setLicensingModuleAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address payable',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'licenseAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'licenseTokenId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'colectionName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalQuantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxBuy',
            type: 'uint256',
          },
        ],
        internalType: 'struct StoryLaunchpadNFT721.NFTLaunchpad',
        name: '_launchpad',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'nftAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'payToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'uriLauchpad',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'uriNFT',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'royaltyPercentage',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'royaltyAddress',
            type: 'address',
          },
        ],
        internalType: 'struct StoryLaunchpadNFT721.LaunchpadInfor',
        name: '_launchpadInfor',
        type: 'tuple',
      },
    ],
    name: 'updateInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userBuyCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
