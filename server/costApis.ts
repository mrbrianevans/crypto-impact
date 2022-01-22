import {Address, Block, Transaction} from "common/types/Blockchain";
import axios from "axios";
import {TransactionWithStats} from "common/types/BlockchainStats";


export async function getTransactions(address: Address): Promise<Transaction[]> {
    return (await axios.get<Address>("https://blockchain.info/rawaddr/"+address)).data.txs;
}

export async function getTransactionsWithStats(address: Address): Promise<TransactionWithStats[]> {
    return [];
}

export function getEnergyRate(date: Date): number {
    // Should change this to read the energy rate from the csv
    return 15.5; // GW
}

export async function getBlockInformation(blockId: string): Promise<Block> {
    return (await axios.get<Block>("https://blockchain.info/rawblock/"+blockId)).data;
}

export function getBlockSolvingTime(block: Block): number {
    return 60*10; // 10 minutes placeholder
}