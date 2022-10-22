import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionsService as Transaction } from 'src/app/utils/transactions.service';
import { WalletService as Wallet } from 'src/app/utils/wallet.service';
import { HttpService } from 'src/app/utils/http.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { Tx } from 'src/app/_helpers/trasaction.interface';
import { ConnectedPeers as Peers } from 'src/app/_helpers/http-response/connected-peers.interface';
import { TransactionsService } from 'src/app/utils/transactions.service';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
	pubKey: any;
	wallets: Data[] = [];
	txObjs: Tx[] = [{
		txHash: '8341dc0fdba11120dd0291dba17445a9eaa761ff8ff9338a6f43ab26f57e9977',
		status: 2,
		block: '000000000000000000004c6285c9d0cfdc620f9b4f9e6e3791f379eb02170943',
		timestamp: Date.now(),
		from: 'bc1q4czhgvmnm3damnvj69zsujxqut0th7cmynhktajxk2c8rrp4nd0qpl70up',
		to: 'bc1q4czhgvmnm3damnvj69zsujxqut0th7cmynhktajxk2c8rrp4nd0qpl70up',
		value: 32,
		txFee: 0.00002,
		txType: 0,
	}];
	constructor(
		public aRoute: ActivatedRoute,
		public router: Router,
		public tx: Transaction,
		public wallet: Wallet,
		public http: HttpService,
		public transaction: TransactionsService
	) {
		this.aRoute.queryParams.subscribe((params: any) => {
			this.pubKey = params.publicKey;
		});
	}

	ngOnInit(): void {
		this.wallets = this.getAllWallets();
	}

	public getAllWallets(): Data[] {
		return this.wallet.loadConnectedWallets();
	}

	searchForTx(search: string): void {
		let nodes: Peers[] = [];
		this.http.getConnectedNodes().subscribe((data: Peers[])=> {
			let ldata = this.transaction.getOnlyValidators(data)
			ldata.forEach((val)=>{
				nodes.push(val)
			})
		})
		console.log(nodes)
	}
}
