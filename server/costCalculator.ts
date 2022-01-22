import {Address, Block, Transaction} from "common/types/Blockchain";
import {getBlockSolvingTime, getEnergyRate, getTransactions} from "./costApis";

/**
 * Takes an address, finds all transactions and returns the sum of their energy costs
 * @param address
 */
const depthLimit = 20;
export function findEnergyCost(address: Address, depth: number): number {
    const transactions = getTransactions(address);

    let totalCost = 0;
    if(depth>depthLimit){
        return 0;
    }else {
        for (const transaction of transactions) {
            const txCost = findTransactionCost(transaction, depth,size);
            totalCost += txCost;
        }
        return totalCost;
    }

}

function findTransactionCost(transaction: Transaction, depth: number): number {

    let energyCost = 1;
    let costProportion = transaction.received / transaction.totalSent;
    let energyRate = getEnergyRate(transaction.date);
    let energyPerTransaction = getEnergyPerTransaction(energyRate, transaction.block);
    return (energyPerTransaction*energyCost) + costProportion*findEnergyCost(transaction.sender[0], depth+1);

}

function getEnergyPerTransaction(energyRate: number, block: Block): number{
    return energyRate*getBlockSolvingTime(block)/block.n_tx;
}

