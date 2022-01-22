import {Address, Block, Transaction} from "./Blockchain";

export interface TransactionWithStats extends Transaction {
    received: number;
    totalSent: number;

    date: Date;

    block: Block;

    sender: Address[];
}