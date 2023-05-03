import { useEffect, useRef, useState } from "react";
import { AddFundsButton, FundingButton } from "../Mui-components/buttons";
import { AmountInput } from "../Mui-components/textFields";
import { kwil } from "../../webKwil";
import { CustomLoader } from "../Mui-components/icons";
import { BrowserProvider } from "ethers";
import { blockConfirmations } from "../../utils/blockConfirmationsDelay";
import { convertToBigNumber, weiToToken } from "../../utils/formatEther";


export default function FundingInterface({ walletAddress }) {
    const [expandInterface, setExpandInterface] = useState(false);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(null);
    const [available, setAvailable] = useState(0);
    const wrapperRef = useRef(null);

    async function approveFunds(provider, amount) {
        const funder = await kwil.getFunder(provider);
        return await funder.approve(convertToBigNumber(amount));
    }

    async function depositFunds(provider, amount) {
        const funder = await kwil.getFunder(provider);
        return await funder.deposit(convertToBigNumber(amount));
    }

    async function approveAndDeposit(amount) {
        setLoading(true);
        const provider = new BrowserProvider(window.ethereum);

        try {
            console.log(amount)
            const approve = await approveFunds(await provider.getSigner(), amount);
            const hash = approve.hash;
            await blockConfirmations(hash, 2);
            
            const deposit = await depositFunds(await provider.getSigner(), amount);
            const hash2 = deposit.hash;
            await blockConfirmations(hash2, 13);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    async function getAvailableBalance(provider) {
        try {
            const address = (await provider.getSigner()).address;
            const acct = await kwil.getAccount(address);
            return acct.data.balance;
        } catch (error) {
            console.log(error);
        }
    };

    async function setAvailableFunds() {
        const provider = new BrowserProvider(window.ethereum);

        const available = await getAvailableBalance(provider);
        setAvailable(weiToToken(available));
    }

    useEffect(() => {
        if(walletAddress) {
            setAvailableFunds();
        }
    }, [walletAddress]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setExpandInterface(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

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
                </div>
            }
            
        </div>
    );
};