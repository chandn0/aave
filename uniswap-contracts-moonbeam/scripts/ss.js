const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);

    //Deploy WETH
    const weth = await ethers.getContractFactory('ss');
    const wethInstance = await weth.deploy(1, 1);
    await wethInstance.deployed();

    console.log(`WETH deployed to : ${wethInstance.address}`);
    await run(`verify:verify`, {
        address: wethInstance.address,
        constructorArguments:
            [
                1,
                1,
            ],
    });

}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
