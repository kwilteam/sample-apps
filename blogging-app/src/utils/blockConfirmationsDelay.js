import { ethers } from "ethers"

export async function blockConfirmations(hash) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider._ready()
    await window.ethereum.request({ method: 'eth_requestAccounts' })

    const transactionReceipt = await provider.getTransaction(hash)
    const blockHash = transactionReceipt.blockHash

    if(!blockHash) {
        return new Promise((resolve) => {
            setTimeout(async () => {
                resolve(await blockConfirmations(hash))
            }, 500)
        })
    }
    return true
}
