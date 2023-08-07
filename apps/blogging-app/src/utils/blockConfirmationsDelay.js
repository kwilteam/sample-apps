import { BrowserProvider } from "ethers";

export async function blockConfirmations(hash, confirms = null) {
    const provider = new BrowserProvider(window.ethereum);
    const transactionReceipt = await provider.waitForTransaction(hash, confirms);
    const blockHash = transactionReceipt.blockHash;

    if(!blockHash) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await blockConfirmations(hash));
            }, 500)
        })
    }
    return true
}
