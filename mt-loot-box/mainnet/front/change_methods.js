const { keyStores, connect } = require("near-api-js");
const path = require("path");
const nearAPI = require("near-api-js");
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
};

async function start() {
    const near = await connect(config);
    const account = await near.account("zombie3.testnet");
    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        "c2.zombie3.testnet",
        {
            changeMethods: ["buy_loot_box","white_list_buy_box"], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    )
    for (let i = 0; i < 3000; i++){
        await sleep(5000)
        await contract.buy_loot_box(
            {},
            300000000000000, // attached GAS (optional)
            nearAPI.utils.format.parseNearAmount('2')
        )
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

}


start()
