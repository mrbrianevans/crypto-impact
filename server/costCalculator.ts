/**
 * Takes an address, finds all transactions and returns the sum of their energy costs
 * @param address
 */
import {Address} from "common/types/Blockchain";

export function findEnergyCost(address: Address): number {
    const transactions = getTransactions(address);
}