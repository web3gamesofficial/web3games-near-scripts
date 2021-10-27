const nearAPI = require("near-api-js");
const {connect } = require("near-api-js");
const fs = require("fs");
const { keyStores, KeyPair } = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = "3fyRSoapmafZ5FkrRsk4WNccLkVsgT7sUMo3jAerqP1VpRFbx1XqEFbWVm63KTKYau1WA7KgvLYTS5cYtr7QHJqn";
const keyPair = KeyPair.fromString(PRIVATE_KEY);

const config = {
    keyStore,
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
};


async function start() {
    const near = await connect(config);
    await keyStore.setKey("testnet", "e2.zombie3.testnet", keyPair);
    const account = await near.account("e2.zombie3.testnet");
    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        "e2.zombie3.testnet",
        {
            changeMethods: ["new"], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    )
    await contract.new(
        {
            owner_id:"e1.zombie3.testnet"
        },
        300000000000000, // attached GAS (optional)
        // nearAPI.utils.format.parseNearAmount('1')
    )
}


start()
