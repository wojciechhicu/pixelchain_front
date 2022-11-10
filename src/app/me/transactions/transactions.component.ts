import { Component, OnInit } from '@angular/core';
import { TransactionsService as Transaction } from 'src/app/utils/transactions.service';
import { HttpService } from 'src/app/utils/http.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { TX } from 'src/app/_helpers/http-response/block.interface';
import { TransactionsService } from 'src/app/utils/transactions.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

	/** Public key of wallet */
	pubKey: any;

	/** helper value to hide/show transaction */
	visibleTX: boolean = false;

	/** All Wallets in memory */
	wallets: Data[] = [];

	/** Transaction object */
	txObj!: TX;

	/** Helper value to show/hide loading spinner in transaction*/
	spinner: boolean = false;

	/** Helper value to show/hide loading spinner in wallet */
	spinnerWallet: boolean = false;

	/** helper value to display wallet transactions */
	visibleWalletTXs: boolean = false;

	constructor(
		public tx: Transaction,
		public http: HttpService,
		public transaction: TransactionsService
	) {
	}

	ngOnInit(): void {
		//just for testing
		this.searchForTx("04493ca61fcd504a051563f2a41f095c1040d2d33694b58ab853b14caf855cae5c713e6ca7c1a2a10584e0f9c6a3720d641103baad200187b4d30fe67e65c55225");
	}

	/**
	 * Send transaction hash or wallet to random node
	 * @param search searching transaction hash or wallet public key
	 */
	searchForTx(search: string): void {
		this.spinner= true
		let test: string = search.slice(0 , 2);
		if(test == '04'){
			this.visibleWalletTXs = true;
			// this.http.connectToRandomNode().then((value)=>{
			// 	this.http.getWalletTransactions(search, `${value.host}:${value.port}/get-wallet-transactions`).then((tx)=>{
			// 		this.visibleWalletTXs = true;
			// 		this.spinnerWallet = true
			// 	}).then(()=>{
			// 		this.spinnerWallet = false
			// 	})
			// })
		} else {
			this.visibleWalletTXs = false;
			this.http.connectToRandomNode().then((val)=>{
				this.http.searchForTransactionInfo(search, `${val.host}:${val.port}/get-transaction-data`).then((val)=>{
					this.visibleTX = true;
					this.txObj = val;
				}).then(()=>{
				this.spinner = false
			})
			})
		}
	}
}
