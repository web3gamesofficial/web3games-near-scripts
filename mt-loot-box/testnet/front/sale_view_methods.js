const { keyStores, connect } = require("near-api-js");
const path = require("path");
const nearAPI = require("near-api-js");
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    // = you local account keystore by near login
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};

async function start() {
    const near = await connect(config);
    const account = await near.account("e1.zombie3.testnet");
    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        "e1.zombie3.testnet",
        {
            viewMethods: ["get_sale_count","get_price","get_enable_state","get_white_list_enable_state","get_mt_limit"], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    )

    // const response = await contract.get_sale_count({});
    // console.log(response);
    //
    // const response = await contract.get_price({});
    // console.log(response);
    //
    // const response = await contract.get_enable_state({});
    // console.log(response);
    //
    // const response = await contract.get_white_list_enable_stat({});
    // console.log(response);
    //
    // const response = await contract.get_mt_limit({account_id:"xxx.testnet" });
    // console.log(response);
}


start()
