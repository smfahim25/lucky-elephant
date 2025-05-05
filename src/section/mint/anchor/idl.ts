export const IDL = {
    "version": "0.1.0",
    "name": "nft_stake_vault",
    "constants": [
        {
            "name": "WEIGHT",
            "type": "u128",
            "value": "1_000_000_000"
        }
    ],
    "instructions": [
        {
            "name": "initStaking",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stakeTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "collectionAddress",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "reward",
                    "type": "u64"
                },
                {
                    "name": "minimumPeriod",
                    "type": "i64"
                },
                {
                    "name": "stakingStartsAt",
                    "type": "i64"
                },
                {
                    "name": "stakingEndsAt",
                    "type": "i64"
                },
                {
                    "name": "maxStakersCount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "stake",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftRecord",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftToken",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMetadata",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftEdition",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftCustody",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "withdrawReward",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftRecord",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rewardMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "stakeTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rewardReceiveAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "staker",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "unstake",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftRecord",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rewardMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "stakeTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rewardReceiveAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftReceiveAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftCustody",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "nftAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "staker",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "extendStaking",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": false,
                    "isSigner": true
                }
            ],
            "args": [
                {
                    "name": "newEndTime",
                    "type": "i64"
                }
            ]
        },
        {
            "name": "changeReward",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "newReward",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "addFunds",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "rewardMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stakeTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "closeStaking",
            "accounts": [
                {
                    "name": "stakeDetails",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stakeTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "creator",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "NftRecord",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "staker",
                        "type": "publicKey"
                    },
                    {
                        "name": "nftMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "stakedAt",
                        "type": "i64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "Details",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "name": "creator",
                        "type": "publicKey"
                    },
                    {
                        "name": "rewardMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "reward",
                        "type": {
                            "vec": "u64"
                        }
                    },
                    {
                        "name": "rewardChangeTime",
                        "type": {
                            "vec": "i64"
                        }
                    },
                    {
                        "name": "collection",
                        "type": "publicKey"
                    },
                    {
                        "name": "maxStakersCount",
                        "type": "u64"
                    },
                    {
                        "name": "currentStakersCount",
                        "type": "u64"
                    },
                    {
                        "name": "stakedWeight",
                        "type": "u128"
                    },
                    {
                        "name": "stakingStartsAt",
                        "type": "i64"
                    },
                    {
                        "name": "stakingEndsAt",
                        "type": "i64"
                    },
                    {
                        "name": "minimumPeriod",
                        "type": "i64"
                    },
                    {
                        "name": "stakeBump",
                        "type": "u8"
                    },
                    {
                        "name": "tokenAuthBump",
                        "type": "u8"
                    },
                    {
                        "name": "nftAuthBump",
                        "type": "u8"
                    },
                    {
                        "name": "currentBalance",
                        "type": "u64"
                    },
                    {
                        "name": "stakedTokens",
                        "type": {
                            "vec": {
                                "defined": "StakedToken"
                            }
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "StakedToken",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "nftMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "staker",
                        "type": "publicKey"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "StakeBumpError",
            "msg": "unable to get stake details bump"
        },
        {
            "code": 6001,
            "name": "NftBumpError",
            "msg": "unable to get nft record bump"
        },
        {
            "code": 6002,
            "name": "NegativePeriodValue",
            "msg": "the minimum staking period in secs can't be negative"
        },
        {
            "code": 6003,
            "name": "InvalidStakeEndTime",
            "msg": "stake ends time must be greater than the current time & start time"
        },
        {
            "code": 6004,
            "name": "TokenNotNFT",
            "msg": "the given mint account doesn't belong to NFT"
        },
        {
            "code": 6005,
            "name": "TokenAccountEmpty",
            "msg": "the given token account has no token"
        },
        {
            "code": 6006,
            "name": "CollectionNotVerified",
            "msg": "the collection field in the metadata is not verified"
        },
        {
            "code": 6007,
            "name": "InvalidCollection",
            "msg": "the collection doesn't match the staking details"
        },
        {
            "code": 6008,
            "name": "MaxStakersReached",
            "msg": "max staker count reached"
        },
        {
            "code": 6009,
            "name": "IneligibleForReward",
            "msg": "the minimum stake period for the rewards not completed yet"
        },
        {
            "code": 6010,
            "name": "StakingIsOver",
            "msg": "the nft stake time is greator than the staking period"
        },
        {
            "code": 6011,
            "name": "StakingNotLive",
            "msg": "the staking is not yet started"
        },
        {
            "code": 6012,
            "name": "StakingInactive",
            "msg": "the staking is not currently active"
        },
        {
            "code": 6013,
            "name": "InsufficientBalInVault",
            "msg": "Insufficient tokens in Vault to extend the period or reward"
        },
        {
            "code": 6014,
            "name": "FailedTimeConversion",
            "msg": "failed to convert the time to u64"
        },
        {
            "code": 6015,
            "name": "FailedWeightConversion",
            "msg": "failed to convert the weight to u64"
        },
        {
            "code": 6016,
            "name": "ProgramAddError",
            "msg": "unable to add the given values"
        },
        {
            "code": 6017,
            "name": "ProgramSubError",
            "msg": "unable to subtract the given values"
        },
        {
            "code": 6018,
            "name": "ProgramMulError",
            "msg": "unable to multiply the given values"
        },
        {
            "code": 6019,
            "name": "ProgramDivError",
            "msg": "unable to divide the given values"
        }
    ]
}