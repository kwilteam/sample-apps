import { BrowserProvider } from "ethers";
import { ConnectButton } from "../../utils/Mui-components/buttons";
import { KwilSigner } from "@kwilteam/kwil-js";
import { useState } from "react";

export default function ConnectMetamask({ kwilSigner, setKwilSigner }) {
    const [walletAddress, setWalletAddress] = useState("Connect Wallet");

    async function ConnectMetamask() {
        if (window.ethereum) {
            try {
                // get ethereum signer and wallet address
                const provider = new BrowserProvider(window.ethereum);
                const ethSigner = await provider.getSigner();
                const address = ethSigner.address;

                // create kwil signer
                const kwilSigner = new KwilSigner(ethSigner, address);

                // set wallet address and kwil signer
                setWalletAddress(address);
                setKwilSigner(kwilSigner);
            } catch (error) {
                console.log(error);
            };
        } else {
            window.alert("Please install Metamask");
        }
    };

    return (
        <>
            <ConnectButton
                onClick={ConnectMetamask}
            >
                <p className="wallet-address">
                    {walletAddress}
                </p>
            </ConnectButton>
        </>
    );
};