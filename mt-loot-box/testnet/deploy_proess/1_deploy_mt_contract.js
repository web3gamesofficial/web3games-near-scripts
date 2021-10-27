const { keyStores, connect } = require("near-api-js");
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";


const ACCOUNT_ID = "dev-1631610367121-47604654915119";


const WASM_PATH = "./output/multi_token.wasm";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
};

deployContract(ACCOUNT_ID, WASM_PATH);

async function deployContract(accountId, wasmPath) {
    const near = await connect(config);
    const account = await near.account(accountId);
    const result = await account.deployContract(fs.readFileSync(wasmPath));
    console.log(result);
}
