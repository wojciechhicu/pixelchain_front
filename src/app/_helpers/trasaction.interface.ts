/**
 * Transaction interfcae 
 */
export interface Tx {
	txHash: string;
	status: number;
	block: string;
	timestamp: number;
	from: string;
	to: string;
	value: number;
	txFee: number;
	txType: number;
}
