export interface Address {
    id: string;
}
export interface Transaction {
    sender: Address[];

    totalSent: number;

    received: number;

    date: Date;

    block: Block;
}
export interface Block {
    id: string;

    nTx: number;
}