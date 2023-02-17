const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);


    const BorrowLogic = await ethers.getContractFactory('BorrowLogic');
    const BorrowLogicInstance = await BorrowLogic.deploy();
    await BorrowLogicInstance.deployed();

    console.log(`BorrowLogic deployed to : ${BorrowLogicInstance.address}`);

    const BridgeLogic = await ethers.getContractFactory('BridgeLogic');
    const BridgeLogicInstance = await BridgeLogic.deploy();
    await BridgeLogicInstance.deployed();

    console.log(`BridgeLogic deployed to : ${BridgeLogicInstance.address}`);


    const EModeLogic = await ethers.getContractFactory('EModeLogic');
    const EModeLogicInstance = await EModeLogic.deploy();
    await EModeLogicInstance.deployed();

    console.log(`EModeLogic deployed to : ${EModeLogicInstance.address}`);

    const FlashLoanLogic = await ethers.getContractFactory('FlashLoanLogic',
        {
            libraries: {
                BorrowLogic: BorrowLogicInstance.address,

            }
        }
    );
    const FlashLoanLogicInstance = await FlashLoanLogic.deploy();
    await FlashLoanLogicInstance.deployed();

    console.log(`FlashLoanLogic deployed to : ${FlashLoanLogicInstance.address}`);

    const LiquidationLogic = await ethers.getContractFactory('LiquidationLogic');
    const LiquidationLogicInstance = await LiquidationLogic.deploy();
    await LiquidationLogicInstance.deployed();

    console.log(`LiquidationLogic deployed to : ${LiquidationLogicInstance.address}`);

    const PoolLogic = await ethers.getContractFactory('PoolLogic');
    const PoolLogicInstance = await PoolLogic.deploy();
    await PoolLogicInstance.deployed();

    console.log(`PoolLogic deployed to : ${PoolLogicInstance.address}`);

    const SupplyLogic = await ethers.getContractFactory('SupplyLogic');
    const SupplyLogicInstance = await SupplyLogic.deploy();
    await SupplyLogicInstance.deployed();

    console.log(`SupplyLogic deployed to : ${SupplyLogicInstance.address}`);


    const ConfiguratorLogic = await ethers.getContractFactory('ConfiguratorLogic');
    const ConfiguratorLogicInstance = await ConfiguratorLogic.deploy();
    await ConfiguratorLogicInstance.deployed();

    console.log(`ConfiguratorLogic deployed to : ${ConfiguratorLogicInstance.address}`);


    //Deploy WETH
    const poolAddressesprovider = await ethers.getContractFactory('PoolAddressesProvider');
    const poolAddressesproviderInstance = await poolAddressesprovider.deploy(1, account.address);
    await poolAddressesproviderInstance.deployed();

    console.log(`poolAddressesprovider deployed to : ${poolAddressesproviderInstance.address}`);
    await run(`verify:verify`, {
        address: poolAddressesproviderInstance.address, constructorArguments:
            [
                1,
                deployerAddress,
            ],
    });


    const PoolAddressesProviderRegistry = await ethers.getContractFactory('PoolAddressesProviderRegistry');
    const PoolAddressesProviderRegistryInstance = await PoolAddressesProviderRegistry.deploy(deployerAddress);
    await PoolAddressesProviderRegistryInstance.deployed();

    console.log(`PoolAddressesProviderRegistry deployed to : ${PoolAddressesProviderRegistryInstance.address}`);

    await run(`verify:verify`, {
        address: PoolAddressesProviderRegistryInstance.address, constructorArguments: [deployerAddress],
    });


    const PoolConfigurator = await ethers.getContractFactory('PoolConfigurator'
        , {
            libraries: {
                ConfiguratorLogic: ConfiguratorLogicInstance.address,
            },
        }
    );
    const PoolConfiguratorInstance = await PoolConfigurator.deploy(
    );
    await PoolConfiguratorInstance.deployed();

    console.log(`PoolConfigurator V02 deployed to :  ${PoolConfiguratorInstance.address}`);

    await run(`verify:verify`, {
        address: PoolConfiguratorInstance.address,
        libraries: {
            ConfiguratorLogic: ConfiguratorLogicInstance.address,
        }

    });

    const Pool = await ethers.getContractFactory('Pool', {
        libraries: {
            BorrowLogic: BorrowLogicInstance.address,
            BridgeLogic: BridgeLogicInstance.address,
            EModeLogic: EModeLogicInstance.address,
            FlashLoanLogic: FlashLoanLogicInstance.address,
            LiquidationLogic: LiquidationLogicInstance.address,
            PoolLogic: PoolLogicInstance.address,
            SupplyLogic: SupplyLogicInstance.address,
        },
    });
    const PoolInstance = await Pool.deploy(
        poolAddressesproviderInstance.address,
    );
    await PoolInstance.deployed();

    console.log(`Pool V02 deployed to :  ${PoolInstance.address}`);

    await run(`verify:verify`, {
        address: PoolInstance.address,
        constructorArguments:
            [
                poolAddressesproviderInstance.address,
            ],
        libraries: {
            BorrowLogic: BorrowLogicInstance.address,
            BridgeLogic: BridgeLogicInstance.address,
            EModeLogic: EModeLogicInstance.address,
            FlashLoanLogic: FlashLoanLogicInstance.address,
            LiquidationLogic: LiquidationLogicInstance.address,
            PoolLogic: PoolLogicInstance.address,
            SupplyLogic: SupplyLogicInstance.address,
        }
    });



    const ACLManager = await ethers.getContractFactory('ACLManager');
    const ACLManagerInstance = await ACLManager.deploy(poolAddressesproviderInstance.address);
    await ACLManagerInstance.deployed();

    console.log(`ACLManager deployed to : ${ACLManagerInstance.address}`);

    await run(`verify:verify`, {
        address: ACLManagerInstance.address, constructorArguments: [poolAddressesproviderInstance.address],
    });


}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
