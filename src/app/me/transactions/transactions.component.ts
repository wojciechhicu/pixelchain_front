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
	pubKey: any;
	visibleTX: boolean = false;
	wallets: Data[] = [];
	txObj!: TX;
	spinner: boolean = false;
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


	searchForTx(search: string): void {
		this.spinner= true
		let test: string = search.slice(0 , 2);
		if(test == '04'){
			this.http.connectToRandomNode().then((value)=>{
				this.http.getWalletTransactions(search, `${value.host}:${value.port}/get-wallet-transactions`).then((tx)=>{
					console.log(tx)
				})
			})
		} else {
			this.http.connectToRandomNode().then((val)=>{
				let transaction = this.http.searchForTransactionInfo(search, `${val.host}:${val.port}/get-transaction-data`);
				transaction.then((value)=>{
					this.visibleTX = true;
					this.txObj = value;
				}).then(()=>{
				this.spinner = false
			})
			})
		}
	}
}
