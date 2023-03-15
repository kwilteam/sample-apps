import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

export function roundEther(input) {
    const number = BigNumber.from(`${input}`);
    const round = formatEther(number);
    const finalNumber = round.toString();
    return finalNumber;
};