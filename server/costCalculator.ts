import {Address, Block, Transaction} from "common/types/Blockchain";
import {getEnergyRate, getTransactions} from "./costApis";

/**
 * Takes an address, finds all transactions and returns the sum of their energy costs
 * @param address
 */
export function findEnergyCost(address: Address): number {
    const transactions = getTransactions(address);

    let totalCost = 0;

    for (const transaction of transactions) {
        const txCost = findTransactionCost(transaction);

        totalCost += txCost;
    }

    return totalCost;
}

function findTransactionCost(transaction: Transaction): number {
    let energyCost = 1;

    let costProportion = transaction.received / transaction.totalSent;

    let energyRate = getEnergyRate(transaction.date);

    let energyPerTransaction = getEnergyPerTransaction(energyRate, transaction.block);

    return (energyPerTransaction*energyCost) + costProportion*findEnergyCost(transaction.sender[0]);
}

function getEnergyPerTransaction(energyrate: number, block: Block): number{
    return energyrate/block.nTx;
}

// Implement getEnergyPerTransaction which takes an energyRate, gets the block's transaction number and return the result
// of energyRate / #blocks

