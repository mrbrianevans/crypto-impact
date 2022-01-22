import {Address, Block, Transaction} from "common/types/Blockchain";
import axios from "axios";
import {TransactionWithStats} from "common/types/BlockchainStats";

export async function getAddress(address: string): Promise<Address> {
    return (await axios.get<Address>("https://blockchain.info/rawaddr/"+address)).data;
}

export async function getTransactions(address: Address): Promise<Transaction[]> {
    return address.txs;
}

export async function getTransactionsWithStats(address: Address): Promise<TransactionWithStats[]> {
    return address.txs.map(tx => ({
        ...tx,
        received: parseInt(tx.out.find(out => out.addr == address.address).value) / 1000000,
        totalSent: tx.out.reduce((prev, cur) => prev+parseInt(cur.value), 0) / 1000000,
        date: new Date(),
        sender: tx.inputs.map(input => input.prev_out.addr),
    }));
}

export function getEnergyRate(date: Date): number {
    // Should change this to read the energy rate from the csv
    return 15.5; // GW
}

export async function getBlockInformation(blockId: number|string): Promise<Block> {
    return (await axios.get<Block>("https://blockchain.info/rawblock/"+blockId)).data;
}

export function getBlockSolvingTime(block: Block): number {
    return 60*10; // 10 minutes placeholder
}