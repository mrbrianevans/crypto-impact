import {CoinSpecificData, Transaction, Vin, Vin2, Vout, Vout2} from "./Blockchain";

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

export const impactResponseSample: ImpactResponse = {
    costBreakDown: [{
        transaction: {
            txid: 'txid',
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
            hex: 'string',
            rbf: false,
            coinSpecificData: {
                txid: 'string',
                hash: 'string',
                version: 0,
                size: 0,
                vsize: 0,
                weight: 0,
                locktime: 0,
                vin: [],
                vout: [],
                hex: 'string',
            },
        },
        impactTxs: Math.random(),
        relativeImpactTxs: Math.random(),
        relativeImpactKwh: Math.random()
    }], totalCostKwh: Math.random(), totalCostTxs: Math.round(Math.random() * 10)
}
