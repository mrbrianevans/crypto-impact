import WebSocket from "ws";
import {BlockchainWebsocketMessage} from "../common/types/BlockchainWebsocketMessage";

const ws = new WebSocket('wss://ws.blockchain.info/inv')
ws.on('open', ()=>console.log('Opened connection'))
ws.on('close', ()=>console.log('Closed connection'))
ws.on('ping', e=>console.log('Ping:',e.toString()))

const w: BlockchainWebsocketMessage = {op: "block",
  x: {
    bits: 0,
    blockIndex: 0,
    estimatedBTCSent: 0,
    hash: "",
    height: 0,
    mrklRoot: "",
    nTx: 0,
    nonce: 0,
    prevBlockIndex: 0,
    reward: 0,
    size: 0,
    time: 0,
    totalBTCSent: 0,
    txIndexes: [],
    version: 0
  }
}