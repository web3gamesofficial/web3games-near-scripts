const nearAPI = require("near-api-js");
const {connect } = require("near-api-js");
const fs = require("fs");
const { keyStores, KeyPair } = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = "64ySkkTcwAHaJaB5LcYgkuo3moGpX8JfcvUHX85apgn7Aew4xCEQTPSzrRWdb4ixH8cwz7aeKBToNBzHz3pLtV3x";
const keyPair = KeyPair.fromString(PRIVATE_KEY);

const config = {
    // = you local account keystore by near login
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://public-rpc.blockpi.io/http/near-testnet",
};


async function addMetadata(){
    let metadata = []
    for (let i = 0;i<60;i++){
        metadata.push([`a${i}`,`b${i}`,`c${i}`])
    }
    return metadata
}


function metadata_list (metadata){
    this.title = metadata[0],
        this.description = metadata[1],
        this.media = metadata[2],
        this.media_hash = null,
        this.issued_at = null,
        this.expires_at = null,
        this.starts_at = null,
        this.updated_at = null,
        this.extra = null
    this.reference = null,
        this.reference_hash = null
}

async function add(metadata){
    let allMetadata = []
    for (let i = 0;i<60;i++){
        allMetadata.push(new metadata_list(metadata[i]))
    }
    return allMetadata
}




const user_account = "e1.zombie3.testnet"
const contract_account = "e1.zombie3.testnet"

async function start() {
    const near = await connect(config);
    await keyStore.setKey("testnet", "e1.zombie3.testnet", keyPair);
    const account = await near.account(user_account);
    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        contract_account,
        {
            changeMethods: ["set_metadata"], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    )
    const allMetadata = await addMetadata()
    const result = await add(allMetadata)
    await contract.set_metadata(
        {
            metadata:result
        },
        300000000000000, // attached GAS (optional)
        // nearAPI.utils.format.parseNearAmount('1')
    )
}

start()
