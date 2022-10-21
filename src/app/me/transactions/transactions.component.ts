import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionsService as Transaction } from 'src/app/utils/transactions.service';
import { WalletService as Wallet} from 'src/app/utils/wallet.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
	pubKey: any;
	wallets: Data[] = [];
	constructor(public aRoute: ActivatedRoute, public router: Router, public tx: Transaction, public wallet: Wallet) {
		this.aRoute.queryParams.subscribe((params: any) => {
			this.pubKey = params.publicKey
		})
	 }

	ngOnInit(): void {
		this.wallets = this.getAllWallets()
	}


	public getAllWallets(): Data[] {
		return this.wallet.loadConnectedWallets()
	}
}
