import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/utils/http.service';
import { SendTransaction } from 'src/app/_helpers/ready-to-send-transaction.interface';
import { WalletService } from 'src/app/utils/wallet.service';

@Component({
	selector: 'app-confirm-send-transaction',
	templateUrl: './confirm-send-transaction.component.html',
	styleUrls: ['./confirm-send-transaction.component.scss'],
})
export class ConfirmSendTransactionComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: SendTransaction,
		private snack: MatSnackBar,
		public http: HttpService,
		public wallet: WalletService
	) {}

	ngOnInit(): void {}

	/**
	 * Send transaction from dialog
	 * @param tx transaction
	 */
	sendTransaction(tx: SendTransaction) {
		if(this.wallet.isUserHaveEnoughFunds(tx.from, tx.txValue, tx.fee)){
			this.http.connectToRandomNode().then((val)=>{
				let baseify = tx;
				baseify.fee = baseify.fee * 10000000;
				baseify.txValue = baseify.txValue * 10000000;
				this.http.sendTransaction(baseify, `${val.host}:${val.port}/send-transaction`).subscribe((obs)=>{
					if(obs.status === 200){
						this.snack.open('Transaction sent.','Close', { duration: 3000})
					} else {
						this.snack.open('Error accured please try again later.', 'Close', {duration: 3000})
					}
				})
				console.log(baseify)
			})
		} else {
			this.snack.open('Not enough funds. Get funds to wallet or synchronise wallets in memory. To synchronise go to wallets section', 'Close', {duration: 10000})
		}
	}
}
