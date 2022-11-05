import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorSendingTransactionComponent } from '../error-sending-transaction/error-sending-transaction.component';
import { ConnectedPeers as Peers } from 'src/app/_helpers/http-response/connected-peers.interface';
import { HttpService } from 'src/app/utils/http.service';
import { SendTransaction } from 'src/app/_helpers/ready-to-send-transaction.interface';

@Component({
	selector: 'app-confirm-send-transaction',
	templateUrl: './confirm-send-transaction.component.html',
	styleUrls: ['./confirm-send-transaction.component.scss'],
})
export class ConfirmSendTransactionComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: SendTransaction,
		private snack: MatSnackBar,
		public http: HttpService
	) {}

	ngOnInit(): void {}

	sendTransaction(tx: SendTransaction) {
		this.http.getConnectedNodes().subscribe((obs)=>{
			let index: number = Math.floor(Math.random() * obs.length)
			this.http.sendTransaction(tx,`${obs[index].host}:${obs[index].port}/send-transaction`).subscribe((obs)=>{
				if(obs.status === 200){
					this.snack.open('Transaction sent.','Close', { duration: 3000})
				} else {
					this.snack.open('Error accured please try again later.', 'Close', {duration: 3000})
				}
			})
		})
	}
}
