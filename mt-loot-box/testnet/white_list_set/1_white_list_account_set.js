const nearAPI = require("near-api-js");
const {connect } = require("near-api-js");
const fs = require("fs");
const { keyStores, KeyPair } = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = "64ySkkTcwAHaJaB5LcYgkuo3moGpX8JfcvUHX85apgn7Aew4xCEQTPSzrRWdb4ixH8cwz7aeKBToNBzHz3pLtV3x";
const keyPair = KeyPair.fromString(PRIVATE_KEY);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://public-rpc.blockpi.io/http/near-testnet",
};

const user_account = "e2.zombie3.testnet"
const contract_account = "e2.zombie3.testnet"

async function start() {
    const near = await connect(config);
    await keyStore.setKey("testnet", "e.zombie3.testnet", keyPair);
    const account = await near.account(user_account);
    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        contract_account,
        {
            changeMethods: ["set_white_list_account"], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    )
    await contract.set_white_list_account(
        {
            account_list:[]
        },
        300000000000000, // attached GAS (optional)
        // nearAPI.utils.format.parseNearAmount('1')
    )
}

start()
