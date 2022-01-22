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

        received: tx.result / 1000000,
        totalSent: tx.out.reduce((prev, cur) => prev+parseInt(cur.value), 0) / 1000000,
        date: new Date(),
        sender: tx.inputs.map(input => input.prev_out.addr),
    }));
}

export function getEnergyRate(date: Date): number {
    // Should change this to read the energy rate from the csv
    return 15.5; // GW
}

// BTC.COM response format
type BlockResponse = Block;
export async function getBlockInformation(blockId: number|string): Promise<Block> {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    // let res = (await axios.get<BlockResponse>("https://api.blockcypher.com/v1/btc/main/blocks/" + blockId)).data;
    // console.log(res);
    // return res;
    return {
        n_tx: 1700,
        height: Number(blockId),
        hash: blockId.toString()
    }
}

// export async function getBlockInformation(blockId: number|string): Promise<Block> {
//     return (await axios.get<Block>("https://blockchain.info/rawblock/"+blockId)).data;
// }

export function getBlockSolvingTime(block: Block): number {
    return 60*10; // 10 minutes placeholder
}