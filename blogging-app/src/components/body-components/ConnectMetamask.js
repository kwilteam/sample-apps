import { ConnectButton } from "../Mui-components/buttons"
import { ethers } from "ethers"


export default function ConnectMetamask({ walletAddress, setWalletAddress }) {
    
    async function ConnectMetamask() {
        if(window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                await provider._ready()
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                const signer = provider.getSigner()
                const address = await signer.getAddress()
                setWalletAddress(address)
            } catch (error) {
                console.log(error) 
            }
        } else {
            window.alert("Please install Metamask")
        }
    }

    return(
        <>
            <ConnectButton
                onClick={ConnectMetamask}
            >
                <p className="wallet-address">
                    {walletAddress ? walletAddress : "Connect Wallet"}
                </p>
            </ConnectButton>
        </>
    )
}