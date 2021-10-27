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
    const account = await near.account("dev-1631610526344-37254839958860");
    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        "dev-1631610526344-37254839958860",
        {
            viewMethods: ["balance_of","balance_of_batch","total_supply","total_supply_batch"], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    )
    // const response = await contract.balance_of({ owner_id: "dev-1631610367121-47604654915119", token_ids: "60001"});
    // console.log(response);
    //
    //
    // const response = await contract.balance_of_batch({ owner_id: "dev-1631610367121-47604654915119", token_ids: ["60001"]});
    // console.log(response);

    // const response = await contract.total_supply({ token_ids: "60001"});
    // console.log(response);
    //
    // const response = await contract.total_supply_batch({token_ids: ["60001"]});
    // console.log(response);
}


start()
