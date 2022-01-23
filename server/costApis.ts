import {Address, Block, Transaction} from "common/types/Blockchain";
import axios from "axios";
import {TransactionWithStats} from "common/types/BlockchainStats";

import {parse} from 'csv-parse/sync';
import * as fs from "fs";

const energyDataset: Array<string> = parse(fs.readFileSync("./datasets/btc-energy-consumption.csv"), {
    from_line: 3
});

const nowKey = "VpMADFdnjyLPT5cIqfYE82iwXNKsHGx0";

export async function getAddress(address: string): Promise<Address> {
    try {
        return (await axios.get<Address>("https://btcbook.nownodes.io/api/v2/address/"+address, {
            headers: {
                "api-key": nowKey
            }
        })).data;
    } catch (e) {
        console.log(e, e.error)
    }
}

export async function getTransaction(txid: string): Promise<Transaction> {
    return (await axios.get<Transaction>("https://btcbook.nownodes.io/api/v2/tx/"+txid, {
        headers: {
            "api-key": nowKey
        }
    })).data;
}


export async function getTransactionsWithStats(address: Address, limit = 100): Promise<TransactionWithStats[]> {
    let txs = await Promise.all(address.txids.slice(0,limit).map(txid => getTransaction(txid)));

    return txs.map(tx => ({
        ...tx,

        received: tx.vout.filter(vout => vout.addresses.includes(address.address))
            .reduce((prev,cur) => prev+parseInt(cur.value), 0) / 1000000,
        totalSent: tx.vout.reduce((prev, cur) => prev+parseInt(cur.value), 0) / 1000000,
        date: new Date(tx.blockTime*1000),
        sender: tx.vin.reduce((prev,cur) => {
            for (let addr of cur.addresses) {
                if (!prev.includes(addr)) prev.push(addr);
            }
            return prev;
        }, []),
    }));
}

export function getEnergyRate(date: Date): number {
    // Should change this to read the energy rate from the csv
    // return 15.5; // GW
    console.log(date);
    const datasetEntry = energyDataset.find(line => line[1] > date.toISOString());

    if (datasetEntry == undefined) return 15.5;
    else {
        console.log("Dataset entry for energy rate found!", datasetEntry);
        return Number(datasetEntry[4]);
    }
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