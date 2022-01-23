import {CoinSpecificData, Transaction, Vin, Vin2, Vout, Vout2} from "./Blockchain";

export interface ImpactResponse {
    totalCostTxs: number;
    totalCostKwh: number;

    costBreakDown: TransactionCost[];

    uncountedTxs: number;
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
function fakeTransaction(): ImpactResponse['costBreakDown'][number] {
    return {
        transaction: {
            txid: Math.round(Math.random() * 100000000000000000).toString(16),
            version: 0,
            lockTime: Date.now(),
            vin: [],
            vout: [],
            blockHeight: 0,
            confirmations: 0,
            blockTime: 0,
            value: 'string',
            valueIn: 'string',
            fees: 'string',
            hex: Math.round(Math.random() * 100000000000000000).toString(16),
            rbf: false,
            coinSpecificData: {
                txid: Math.round(Math.random() * 100000000000000000).toString(16),
                hash: Math.round(Math.random() * 100000000000000000).toString(36),
                version: 0,
                size: 0,
                vsize: 0,
                weight: 0,
                locktime: 0,
                vin: [],
                vout: [],
                hex: Math.round(Math.random() * 100000000000000000).toString(16),
            },
        },
        impactTxs: Math.round(Math.random() * 10),
        relativeImpactTxs: Math.round(Math.random() * 5),
        relativeImpactKwh: Math.random()
    }
}
export const impactResponseSample: ImpactResponse = {
    costBreakDown: Array.from(Array(50), (v, i) => fakeTransaction()),
    totalCostKwh: Math.random() * 10, totalCostTxs: Math.round(Math.random() * 100),
    uncountedTxs: Math.round(Math.random() * 100)
}
