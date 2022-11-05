import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectedPeers as Peers } from '../_helpers/http-response/connected-peers.interface';
import { SendTransaction } from '../_helpers/ready-to-send-transaction.interface';
import { environment } from 'src/environments/environment';
import { TX } from '../_helpers/http-response/block.interface';
import { TXHash } from '../_helpers/http-response/txhash.interface';

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
	getConnectedNodes() {
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
	getMempool(url: string){
		return this.http.get<SendTransaction[]>(url);
	}

	/**
	 * search for transaction in blockchain
	 * @param transaction hash of transaction
	 * @param url url to node
	 * @returns transaction object
	 */
	searchForTransactionInfo(transaction: string, url: string){
		const hash: TXHash = {
			TxHash: transaction
		}
		return this.http.post<TX>(url, hash, {observe: 'response'})
	}
}
