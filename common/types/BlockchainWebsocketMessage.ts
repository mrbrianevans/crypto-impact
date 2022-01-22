// from https://www.blockchain.com/api/api_websocket
export interface BlockchainWebsocketMessage {
	op: 'block';
	x: {
		txIndexes: number[];
		nTx: number;
		totalBTCSent: number;
		estimatedBTCSent: number;
		reward: number;
		size: number;
		blockIndex: number;
		prevBlockIndex: number;
		height: number;
		hash: string;
		mrklRoot: string;
		version: number;
		time: number;
		bits: number;
		nonce: number;
	};
}