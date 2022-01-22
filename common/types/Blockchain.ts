export interface Address {
    page: number;
    totalPages: number;
    itemsOnPage: number;
    address: string;
    balance: string;
    totalReceived: string;
    totalSent: string;
    unconfirmedBalance: string;
    unconfirmedTxs: number;
    txs: number;
    txids: string[];
}
export interface Vin {
    txid: string;
    vout: number;
    sequence: number;
    n: number;
    addresses: string[];
    isAddress: boolean;
    value: string;
}

export interface Vout {
    value: string;
    n: number;
    hex: string;
    addresses: string[];
    isAddress: boolean;
}

export interface ScriptSig {
    asm: string;
    hex: string;
}

export interface Vin2 {
    txid: string;
    vout: number;
    scriptSig: ScriptSig;
    txinwitness: string[];
    sequence: number;
}

export interface ScriptPubKey {
    asm: string;
    hex: string;
    reqSigs: number;
    type: string;
    addresses: string[];
}

export interface Vout2 {
    value: number;
    n: number;
    scriptPubKey: ScriptPubKey;
}

export interface CoinSpecificData {
    txid: string;
    hash: string;
    version: number;
    size: number;
    vsize: number;
    weight: number;
    locktime: number;
    vin: Vin2[];
    vout: Vout2[];
    hex: string;
}

export interface Transaction {
    txid: string;
    version: number;
    lockTime: number;
    vin: Vin[];
    vout: Vout[];
    blockHeight: number;
    confirmations: number;
    blockTime: number;
    value: string;
    valueIn: string;
    fees: string;
    hex: string;
    rbf: boolean;
    coinSpecificData: CoinSpecificData;
}

export interface Block {
    hash: string;
    height: number;
    n_tx: number;
}