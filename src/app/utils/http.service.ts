import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectedPeers as Peers } from '../_helpers/http-response/connected-peers.interface';
import { SendTransaction } from '../_helpers/ready-to-send-transaction.interface';
import { environment } from 'src/environments/environment';
import { TX } from '../_helpers/http-response/block.interface';
import { TXHash } from '../_helpers/http-response/txhash.interface';
import { take } from 'rxjs';
import { WalletBalances as WB} from '../_helpers/received-wallet-balances.interface';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) {

	}

	/**
	 * Get connected nodes to network
	 * @returns nodes connected to network
	 */
	private getConnectedNodes() {
		return this.http.get<Peers[]>(environment.router)
	}

	/**
	 * Send transaction to node
	 * @param tx transaction object
	 * @param url url to node
	 * @returns if transaction was added
	 */
	sendTransaction(tx: SendTransaction, url: string){
		return this.http.post<SendTransaction>(url,tx, {observe: 'response'});
	}

	/**
	 * Get mempool full data
	 * @param url url to server
	 * @returns mempool transactions
	 */
	async getMempool(url: string): Promise<SendTransaction[]>{
		// return this.http.get<SendTransaction[]>(url);
		return new Promise(resolve => {
			this.http.get<SendTransaction[]>(url).pipe(take(1)).subscribe((obs)=>{
				resolve(obs)
			})
		})
	}

	/**
	 * search for transaction in blockchain
	 * @param transaction hash of transaction
	 * @param url url to node
	 * @returns transaction object
	 */
	public searchForTransactionInfo(transaction: string, url: string): Promise<TX>{
		return new Promise(resolve=>{
			const hash: TXHash = {
				TxHash: transaction
			}
			this.http.post(url, hash, {observe: 'response'}).pipe(take(1)).subscribe((obs: any)=>{
				const tx: TX = obs.body;
				resolve(tx)
			})
		})
	}

	/**
	 * Get connected wallets balances
	 * @param pubKeys public keys array of wallets which user want to get balance
	 * @param url url to server
	 * @returns resposne
	 */
	public async getWalletsBalances(pubKeys: string[], url: string): Promise<WB[]>{
		return new Promise(resolve=>{
			this.http.post(url, pubKeys, {observe: 'response'}).pipe(take(1)).subscribe((data: any)=>{
				let res: WB[] = data.body;
				resolve(res)
			})
		})
	}

	/**
	 * Connect to random node/ peer to network
	 * @returns promise with single peer data
	 */
	public async connectToRandomNode(): Promise<Peers>{
		return new Promise(resolve=>{
			this.getConnectedNodes().pipe(take(1)).subscribe((data:any)=>{
				let nodes: Peers[] = data;
				let index: number = Math.floor(Math.random() * nodes.length);

				resolve(nodes[index])
			})
		})
	}

	/**
	 * Get wallet transactions with specyfied wallet hash
	 * @param wallet wallet hash
	 * @param url url where to send wallet
	 * @returns transactions
	 */
	public async getWalletTransactions(wallet: string, url: string): Promise<TX[]>{
		const walletObj = {
			wallet: wallet
		}
		return new Promise(resolve=>{
			this.http.post(url, walletObj, {observe: 'response'}).pipe(take(10)).subscribe((data: any)=>{
				const transactions: TX[] = data.body;
				resolve(transactions)
			})
		})
	}
}
