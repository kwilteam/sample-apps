import BigNumber from "bignumber.js";

function convertToToken(num, decimals = 18, outputDecimals = 4) {
    if(!(num instanceof BigNumber)) {
        throw new Error("Input must be a big number");
    }

    return num.dividedBy(new BigNumber(10).pow(decimals)).toFixed(outputDecimals, BigNumber.ROUND_DOWN); 
}

export function weiToToken(amount) {
    return convertToToken(new BigNumber(amount));
}

export function convertToBigNumber(amount, decimals = 18) {
    const val = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals));
    return val.toString();
}