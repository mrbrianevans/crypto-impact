export interface Address {
    hash160: string;
    address: string;

    n_tx: number;
    n_unredeemed: number;

    total_received: number;
    total_sent: number;
    final_balance: number;

    txs: Transaction[];
}
export interface Transaction {
    // sender: Address[];
    //
    // totalSent: number;
    //
    // received: number;
    //
    // date: Date;

    // block: Block;

    result: number;

    hash: string;
    ver: number;
    vin_sz: number;
    vout_sz: number;
    lock_time: string;
    size: number;
    relayed_by: string;
    block_height: number;
    tx_index: string;
    inputs: Input[];
    out: Out[];
}

interface PrevOut {
    addr: string;
    value: string;
    tx_index: string;
    n: string;
    spent: boolean;
}

interface Input {
    prev_out: PrevOut;
    script: string;
}

interface Out {
    value: string;
    addr: string;
    n: number;
    spent: boolean;
    script: string;
}

export interface Block {
    hash: string;
    height: number;
    n_tx: number;
}