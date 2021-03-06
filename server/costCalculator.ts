import {Address, Block} from "common/types/Blockchain";
import {
    getAddress,
    getBlockInformation,
    getBlockSolvingTime,
    getEnergyRate,
    getTransactionsWithStats
} from "./costApis";
import {TransactionWithStats} from "common/types/BlockchainStats";
import {ImpactResponse, TransactionCost} from "common/types/ImpactResponse";

const depthLimit = 10;
const prLimit = 0.1;

/**
 * Takes an address, finds all transactions and returns the sum of their energy costs in kWH
 * @param address
 * @param depth
 * @param costPC
 */
let gWs_to_kWh = 3.6;

export async function findEnergyCost(address: Address, depth: number, costProportion: number = 1, impactResponse: ImpactResponse): Promise<ImpactResponse> {
    console.log(depth, costProportion, impactResponse);
    const transactions = (await getTransactionsWithStats(address, 50))
      .filter(tx => !tx.sender.includes(address.address));

    console.log('Found', transactions.length, 'transactions for address', address.address)

    const uncountedTxs = address.txs - Math.min(transactions.length, 50);

    // If depth-0 (main addr), store uncountedTxs in impact response
    if (depth==0) {
        impactResponse.uncountedTxs = uncountedTxs;
    }

    // Count all other transactions with tx cost 1
    impactResponse.totalCostTxs += uncountedTxs * costProportion;
    // Energy rate is an approximation of 1.52 kwh per tx
    impactResponse.totalCostKwh += uncountedTxs * costProportion * 1.52;

    if (depth > depthLimit || costProportion < prLimit) {
        return impactResponse;
    } else {
        for (const transaction of transactions.slice(0, 50)) {
            impactResponse = await updateTransactionCost(transaction, depth, costProportion, impactResponse);
        }
        return impactResponse;
    }
}

/**
 * Takes a transaction and returns the energy consumed by it, along with the energy consumed
 * @param transaction
 * @param depth
 * @param costProportion
 * @param impactResponse
 */
async function updateTransactionCost(transaction: TransactionWithStats, depth: number, costProportion: number, impactResponse: ImpactResponse): Promise<ImpactResponse> {

    // The sender address is for further depth search
    let senderAddress = await getAddress(transaction.sender[0]);


    // The purpose of this function is different. It takes impactResponse (a record of cost breakdown for display in the UI, as well as total cost)
    // Calculating the energy of this transaction
    let energyRate = getEnergyRate(transaction.date);
    let energyPerTransaction = await getEnergyPerTransaction(energyRate, transaction.blockHeight);

    // We only want to count the proportion that was ever sent to the sender

    const newTransactionCost: TransactionCost = {
        impactTxs: 1.0,
        relativeImpactKwh: energyPerTransaction * (depth==0 ? 1 : costProportion) / gWs_to_kWh,
        relativeImpactTxs: (depth==0 ? 1 : costProportion),
        transaction: transaction
    }

    costProportion *= transaction.received / Number(senderAddress.totalReceived);

    // One transaction has happened. We update the sum
    impactResponse.totalCostKwh = impactResponse.totalCostKwh + newTransactionCost.relativeImpactKwh;
    impactResponse.totalCostTxs = impactResponse.totalCostTxs + newTransactionCost.relativeImpactTxs;
    // We record this transaction.
    impactResponse.costBreakDown.push(newTransactionCost);

    // Now we recursively traverse the tree.
    impactResponse = await findEnergyCost(senderAddress, depth + 1, costProportion, impactResponse);

    return impactResponse;

}

async function getEnergyPerTransaction(energyRate: number, block_height: number): Promise<number> {
    let block: Block = await getBlockInformation(block_height);
    return energyRate*getBlockSolvingTime(block)/block.n_tx;
}
