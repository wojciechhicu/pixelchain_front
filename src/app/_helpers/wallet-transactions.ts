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
export interface pixelBalance {
	balance: number;
	day: string;
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

/** before grouping balance  */
interface middleTransform {
        balance: number;
        date: string;
}
/**
 * FN to create datatable from server response. It restruck object.
 * @param res response from server
 * @returns correct object
 */
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

/**
 * Get transaction object and return value for 'from' wallet as balance after transaction
 * @param tx transaction object
 * @param from wallet to search as balance
 * @returns balance after this transaction
 */
 function transform(tx: TX, from: string): number {
        if( tx.from == from){
                return 0 - tx.txValue - tx.fee
        } else{
                return 0 + tx.txValue
        }
}

/**
 * Function for filter function on array to get only unique values
 * @param value value
 * @param index index
 * @param self self
 * @returns true or false
 */
function onlyUnique(value: any, index: any, self: any): boolean{
        return self.indexOf(value) === index
}

/**
 * Group and modify data to expecting form
 * @param trans transactions
 * @returns grouped and modifyied per day object
 */
function group(trans: middleTransform[]):pixelBalance[]{
        let days: string[] = [];
        let finalData: pixelBalance[] = [];
        
        trans.forEach((val)=>{
                days.push(val.date);
        })
        let filteredDays = days.filter(onlyUnique);
        filteredDays.forEach((val)=>{
                let singleData: pixelBalance = {balance: 0, day: ''};
                singleData.day = val;
                singleData.balance = 0;
                trans.forEach((value)=>{
                        singleData.balance += value.balance
                })
                singleData.balance = singleData.balance / 10000000
                finalData.push(singleData)
        })
        return finalData
}

/**
 * Create new structure from server response
 * @param res response from server
 * @param from searched wallet
 * @returns restructured object
 */
export function pixelBalanceChartData(res: responseWalletTxs[], from: string): pixelBalance[] {
        let transactions: TX[] = [];
        let middleData: middleTransform[] = [];
        res.forEach((value)=>{
                value.transactions.forEach((val)=>{
                        transactions.push(val)
                })
        })

        transactions.forEach((value)=>{
                let middleDataTmp: middleTransform = { balance: 0, date: ''};
                
                middleDataTmp.balance = transform(value, from);
                middleDataTmp.date = `${new Date(value.timestamp * 1000).getDate()}/${new Date(value.timestamp * 1000).getMonth() + 1}/${new Date(value.timestamp * 1000).getFullYear()}`
                middleData.push(middleDataTmp)
        })

        const final = group(middleData);
        return final;
}
