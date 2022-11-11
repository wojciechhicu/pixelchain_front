import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { TransactionsService as Transaction } from 'src/app/utils/transactions.service';
import { HttpService } from 'src/app/utils/http.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { TX } from 'src/app/_helpers/http-response/block.interface';
import { TransactionsService } from 'src/app/utils/transactions.service';
import * as EventEmitter from 'events';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

	@Input() walletHash: string = '';
	@Output() walletHashChange = new EventEmitter();



	constructor(
		public tx: Transaction,
		public http: HttpService,
		public transaction: TransactionsService,
		private aRoute: ActivatedRoute,
		private snack: MatSnackBar
	) {
	}

	ngOnInit(): void {
		this.searchForParameter()
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
			this.walletHash = search
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

	/**
	 * Search for param name in url as publicKey and if it exist and have correct data search it in blockchain and show component
	 */
	searchForParameter(): void {
		this.aRoute.queryParams.subscribe((params: any)=>{
			if(params.publicKey){
				if(params.publicKey.length >= 130 && params.publicKey.slice(0, 2) == '04'){
					this.searchForTx(params.publicKey)
				} else {
					this.snack.open('Public key as address incorrect', 'Close', {duration: 3000})
				}
			}
		})
	}
}
