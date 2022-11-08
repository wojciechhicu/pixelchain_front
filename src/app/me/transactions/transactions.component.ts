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
		this.searchForTx("bffda9fdb9115d08aae26571ca56d546c4a063751a3837252011150dcc41b59b");
	}


	searchForTx(search: string): void {
		this.spinner= true
		let test: string = search.slice(0 , 2);
		if(test == '04'){
			console.log("Wallet")
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
