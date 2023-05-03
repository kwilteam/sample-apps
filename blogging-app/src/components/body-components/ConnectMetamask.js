import { BrowserProvider } from "ethers";
import { ConnectButton } from "../Mui-components/buttons";


export default function ConnectMetamask({ walletAddress, setWalletAddress }) {
    
    async function ConnectMetamask() {
        if(window.ethereum) {
            try {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = signer.address;
                setWalletAddress(address);
            } catch (error) {
                console.log(error);
            };
        } else {
            window.alert("Please install Metamask");
        }
    };

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
    );
};