import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionsService as Transaction } from 'src/app/utils/transactions.service';
import { WalletService as Wallet } from 'src/app/utils/wallet.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { Tx } from 'src/app/_helpers/trasaction.interface';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
	pubKey: any;
	wallets: Data[] = [];
	txObj: Tx = {
		txHash: '389ufj3e4kur3984ur',
		status: 2,
		block: '1232343ewrwefc534f5345',
		timestamp: 1666391420,
		from: 'df3r34f5345f',
		to: '234f345f34f5',
		value: 32,
		txFee: 0.00002,
		txType: 0,
	};
	constructor(
		public aRoute: ActivatedRoute,
		public router: Router,
		public tx: Transaction,
		public wallet: Wallet
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
}
