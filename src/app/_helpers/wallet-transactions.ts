import { TX } from "./http-response/block.interface";

/**
 * Table data datasource
 */
export interface tableData{
	txHash: string;
	blockHeight: number;
	timestamp: number;
	from: string;
	to: string;
	value: number;
	fee: number;
}

/**
 * balance in pixels over time chart
 */
export interface picelBalance {
	balance: number;
	time: number;
}

/**
 * TX's over time chart
 */
export interface txsOverTime{
	timestamp: number;
	numberOfTxs: number;
	inCommingTxs: number;
	outCommingTxs: number;
}

/**
 * Fee spent chart
 */
export interface feeSpent {
	timestamp: number;
	feeSpent: number;
}

/**
 * Pixels transfer chart
 */
export interface pixelsTransfer {
	timestamp: number;
	received: number;
	sent: number;
}

/** Response from server  */
export interface responseWalletTxs {
	blockHeight: number;
	transactions: TX[];
}
