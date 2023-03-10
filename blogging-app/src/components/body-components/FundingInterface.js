import { useEffect, useRef, useState } from "react";
import { AddFundsButton, FundingButton } from "../Mui-components/buttons";
import { AmountInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { parseEther } from "ethers/lib/utils";
import { CustomLoader } from "../Mui-components/icons";
import { Web3Provider } from "@ethersproject/providers";
import { blockConfirmations } from "../../utils/blockConfirmationsDelay";
import { roundEther } from "../../utils/formatEther";


export default function FundingInterface({ walletAddress }) {
    const [expandInterface, setExpandInterface] = useState(false);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(null);
    const [available, setAvailable] = useState(0);
    const [used, setUsed] = useState(0);
    const wrapperRef = useRef(null);

    async function aproveFunds(provider, amount) {
        const funder = await kwil.getFunder(provider);
        return await funder.approve(parseEther(`${amount}`));
    }

    async function depositFunds(provider, amount) {
        const funder = await kwil.getFunder(provider);
        return await funder.deposit(parseEther(`${amount}`));
    }

    async function approveAndDeposit(amount) {
        setLoading(true);
        const provider = new Web3Provider(window.ethereum);
        await provider._ready()
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        try {
            const approve = await aproveFunds(provider.getSigner(), amount);
            const hash = approve.hash;
            await blockConfirmations(hash);
            
            const deposit = await depositFunds(provider.getSigner(), amount);
            const hash2 = deposit.hash;
            await blockConfirmations(hash2);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function getDepositedBalance(provider) {
        const funder = await kwil.getFunder(provider);
        const address = await provider.getSigner().getAddress();
        return await funder.getDepositedBalance(address);
    }

    async function getUsedBalance(provider) {
        const address = await provider.getSigner().getAddress();
        const acct = await kwil.getAccount(address);
        return acct.data.spent
    }

    async function setAvailableAndUsed() {
        const provider = new Web3Provider(window.ethereum);
        await provider._ready()
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const used = await getUsedBalance(provider);
        const depositFunds = await getDepositedBalance(provider);

        setUsed(roundEther(used));
        setAvailable(roundEther(depositFunds) - roundEther(used));
    }

    useEffect(() => {
        if(walletAddress) {
            setAvailableAndUsed();
        }
    }, [walletAddress])

    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setExpandInterface(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef])

    return(
        <div
            ref={wrapperRef}
        >
            <FundingButton
                onClick={() => setExpandInterface(!expandInterface)}
            >
                Funding
            </FundingButton>
            {expandInterface && 
                <div className="funding-interface">
                    <p className="funding-text">Add Funds:</p>
                    <AmountInput
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Set Amount"
                    />
                    <AddFundsButton
                        onClick={() => approveAndDeposit(amount)}
                    >
                        Add Funds
                    </AddFundsButton>
                    <p className="funding-text">Available:</p>
                    {!loading ? 
                        <p className="funding-number">{available}</p> :
                        <CustomLoader />    
                    }
                    <p className="funding-text">Used:</p>
                    <p className="funding-number">{used}</p>
                </div>
            }
            
        </div>
    )
}