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

//FIXME naprawić zwracanie obiektu
export function creatDataTable(res: responseWalletTxs[]): tableData[]{
        let finalData: tableData[] = []
        if(res.length <= 0){
                return finalData
        } else {
                res.forEach((val)=>{

                        val.transactions.forEach((v)=>{
                                if(v.TxHash != undefined){
                                        let singleData: tableData = { fee: 0, from: '', timestamp: 0, to: '', txHash: '', value: 0, blockHeight: 0}
                                        singleData.blockHeight = val.blockHeight;
                                        singleData.fee = v.fee;
                                        singleData.from = v.from;
                                        singleData.timestamp = v.timestamp;
                                        singleData.to = v.to;
                                        singleData.txHash = v.TxHash;
                                        singleData.value = v.txValue;
                                        finalData.push(singleData)
                                }
                        })
                })
                return finalData
        }
}