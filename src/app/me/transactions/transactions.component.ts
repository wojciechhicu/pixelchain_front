import { Component, OnInit } from '@angular/core';
import { TransactionsService as Transaction } from 'src/app/utils/transactions.service';
import { WalletService as Wallet } from 'src/app/utils/wallet.service';
import { HttpService } from 'src/app/utils/http.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { Tx } from 'src/app/_helpers/trasaction.interface';
import { TX } from 'src/app/_helpers/http-response/block.interface';
import { ConnectedPeers as Peers } from 'src/app/_helpers/http-response/connected-peers.interface';
import { TransactionsService } from 'src/app/utils/transactions.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
	pubKey: any;
	visible: boolean = false;
	wallets: Data[] = [];
	txObj!: TX;
	constructor(
		public tx: Transaction,
		public wallet: Wallet,
		public http: HttpService,
		public transaction: TransactionsService
	) {
	}

	ngOnInit(): void {
		this.wallets = this.getAllWallets();
	}

	public getAllWallets(): Data[] {
		return this.wallet.loadConnectedWallets();
	}

	searchForTx(search: string): void {

		let test: string = search.slice(0 , 2);
		if(test == '04'){
			console.log("Wallet")
		} else {
			this.http.connectToRandomNode().then((val)=>{
				let transaction = this.http.searchForTransactionInfo(search, `${val.host}:${val.port}/get-transaction-data`);
				transaction.then((value)=>{
					this.visible = true;
					this.txObj = value
				})
			})
		}
	}
}
