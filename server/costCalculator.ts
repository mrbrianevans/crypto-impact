import {Address, Block} from "common/types/Blockchain";
import {
    getAddress,
    getBlockInformation,
    getBlockSolvingTime,
    getEnergyRate,
    getTransactionsWithStats
} from "./costApis";
import {TransactionWithStats} from "common/types/BlockchainStats";

/**
 * Takes an address, finds all transactions and returns the sum of their energy costs
 * @param address
 */
const depthLimit = 10;
const prLimit = 0.1;
export async function findEnergyCost(address: Address, depth: number, costPC: number = 1): Promise<number> {
    const transactions = (await getTransactionsWithStats(address)).filter(tx => tx.result > 0);
    let totalCost = 0;
    if(depth>depthLimit || costPC < prLimit){
        return 0;
    }else {
        for (const transaction of transactions.slice(0,50)) {
            const txCost = findTransactionCost(transaction, depth, costPC);
            totalCost += await txCost;
        }
        return totalCost;
    }
}

async function findTransactionCost(transaction: TransactionWithStats, depth: number, costPC:number): Promise<number> {

    let energyCost = 1;
    let costProportion = transaction.received / transaction.totalSent;
    costPC *= costProportion;
    let energyRate = getEnergyRate(transaction.date);

    let energyPerTransaction = await getEnergyPerTransaction(energyRate, transaction.block_height);
    return (energyPerTransaction * energyCost) + costProportion
        * await findEnergyCost(await getAddress(transaction.sender[0]), depth + 1, costPC);

}

async function getEnergyPerTransaction(energyRate: number, block_height: number): Promise<number> {
    let block: Block = await getBlockInformation(block_height);
    return energyRate*getBlockSolvingTime(block)/block.n_tx;
}