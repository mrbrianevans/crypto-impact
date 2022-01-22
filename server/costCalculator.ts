import {Address, Block} from "common/types/Blockchain";
import {
    getAddress,
    getBlockInformation,
    getBlockSolvingTime,
    getEnergyRate,
    getTransactionsWithStats
} from "./costApis";
import {TransactionWithStats} from "common/types/BlockchainStats";

const depthLimit = 10;
const prLimit = 0.1;

/**
 * Takes an address, finds all transactions and returns the sum of their energy costs in kWH
 * @param address
 * @param depth
 * @param costPC
 */
let gWs_to_kWh = 3.6;
export async function findEnergyCost(address: Address, depth: number, costPC: number = 1): Promise<number> {
    console.log(depth, costPC);
    const transactions = (await getTransactionsWithStats(address))
        .filter(tx => !tx.sender.includes(address.address));
    let totalCost = 0;
    if(depth>depthLimit || costPC < prLimit){
        return 0;
    }else {
        for (const transaction of transactions.slice(0,50)) {
            const txCost = findTransactionCost(transaction, depth, costPC);
            totalCost += await txCost;
        }
        return totalCost / gWs_to_kWh;
    }
}

/**
 * Takes a transaction and returns the energy consumed by it, along with the energy consumed
 * @param transaction
 * @param depth
 * @param costPC
 */
async function findTransactionCost(transaction: TransactionWithStats, depth: number, costPC:number): Promise<number> {

    let energyCost = 1;

    let energyRate = getEnergyRate(transaction.date);

    let energyPerTransaction = await getEnergyPerTransaction(energyRate, transaction.blockHeight);

    let senderAddress = await getAddress(transaction.sender[0]);

    // We only want to count the proportion that was ever sent to the sender
    let costProportion = transaction.received / Number(senderAddress.totalReceived);
    costPC *= costProportion;

    return (energyPerTransaction * energyCost) + (costProportion
        * await findEnergyCost(senderAddress, depth + 1, costPC));

}

async function getEnergyPerTransaction(energyRate: number, block_height: number): Promise<number> {
    let block: Block = await getBlockInformation(block_height);
    return energyRate*getBlockSolvingTime(block)/block.n_tx;
}
