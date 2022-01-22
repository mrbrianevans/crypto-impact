import {Transaction} from "./Blockchain";

export interface ImpactResponse {
    totalCostTxs: number;
    totalCostKwh: number;

    costBreakDown: TransactionCost[]
}

export interface TransactionCost {
    txid: string;
    transaction: Transaction;

    impactTxs: number;
    relativeImpactTxs: number;

    relativeImpactKwh: number;
}