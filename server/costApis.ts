import {Address, Block, Transaction} from "common/types/Blockchain";


export function getTransactions(address: Address): Transaction[] {
    return [];
}

export function getEnergyRate(date: Date): number {
    return 0;
}

export function getBlockInformation(blockId: string): Block {
    return {id: blockId, nTx: 1};
}