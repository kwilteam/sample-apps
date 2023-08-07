import { ExtensionBuilder, InitializeFn, MethodFn } from 'kwil-extensions';
import abi from './abi/erc20.json';
import { Contract, JsonRpcProvider } from 'ethers';
require('dotenv').config();

// Create initialize function to be called when the extension is loaded
const initialize: InitializeFn = async(metadata: Record<string, string>) => {
    if(!metadata['erc_address']) {
        throw new Error('Extension must be initialized with an ERC20 address on Goerli.')
    }

    return metadata;
}

// Function to retrieve the balance of an address
async function getBalance(ercAddress: string, walletAddress: string): Promise<number> {
    const provider = new JsonRpcProvider(process.env.GOERLI_RPC);
    const contract = new Contract(ercAddress, abi, provider);
    const balance = await contract['balanceOf(address)'](walletAddress);
    const balanceInEth = BigInt(balance) / BigInt(10n ** 18n);
    return Number(balanceInEth);
}

// Create extension methods to be called within Kuneiform Actions
const retrieveBalance: MethodFn = async({ metadata, inputs }) => {
    const contractAddress = metadata['erc_address'];
    const walletAddress = inputs[0].toString();
    const balance = await getBalance(contractAddress, walletAddress);
    return balance;
}

const checkBalance: MethodFn = async({ metadata, inputs }) => {
    const contractAddress = metadata['erc_address'];
    const walletAddress = inputs[0].toString();
    const balance = await getBalance(contractAddress, walletAddress);
    
    if(balance < 10) {
        throw new Error(`Balance is too low. Wallet must hold at least 10 tokens. Current balance: ${balance}`);
    }

    return balance;
}

// Build extensions server
function buildServer(): void {
    const server = new ExtensionBuilder()
        .named('erc20extensions')
        .withInitializer(initialize)
        .withMethods({
            retrieveBalance,
            checkBalance
        })
        .build();

    process.on('SIGINT', () => {
        server.stop();
    })

    process.on('SIGTERM', () => {
        server.stop();
    })
}

buildServer();