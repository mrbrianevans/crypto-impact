import {Transaction} from "./Blockchain";

export interface ImpactResponse {
    totalCostTxs: number;
    totalCostKwh: number;

    costBreakDown: TransactionCost[]
}

export interface TransactionCost {
    // Wrap transaction as part of the cost object
    transaction: Transaction;

    // Total impact in tx units without the cost proportionality weights applied
    // This will be 1 by default or whatever the default cost unit is
    impactTxs: number;

    // Total impact in tx units with the cost proportionality weights applied
    // This is the same calculation as relativeImpactKwh but without the tx unit -> energy rate calculation
    relativeImpactTxs: number;

    // Total impact in kwh with the cost proportionality weights applied
    // This is the main indicator and the default calculation to make
    relativeImpactKwh: number;
}