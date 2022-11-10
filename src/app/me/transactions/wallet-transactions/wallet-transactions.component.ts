import { Component, OnInit, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as EventEmitter from 'events';


@Component({
	selector: 'app-wallet-transactions',
	templateUrl: './wallet-transactions.component.html',
	styleUrls: ['./wallet-transactions.component.scss'],
	animations: [
		trigger('fadeIn1', [
			transition(':enter', [
				style({transform: 'translateX(+100%)'}),
				animate('200ms ease-in', style({transform: 'translateX(0%)'}))
			])
		]),
		trigger('fadeIn', [
			transition('void => *', [
				style({opcacity: 0}),
				animate('400ms ease-in', style({opacity: 1}))
			])
		])
	]
})
export class WalletTransactionsComponent implements OnInit {
	@Input() walletHash: string = '';
	@Output() walletHashChange = new EventEmitter();
	constructor() {}

	ngOnInit(): void {}

				// this.http.connectToRandomNode().then((value)=>{
			// 	this.http.getWalletTransactions(search, `${value.host}:${value.port}/get-wallet-transactions`).then((tx)=>{
			// 		this.visibleWalletTXs = true;
			// 		this.spinnerWallet = true;
			// 		console.log(tx)
			// 	}).then(()=>{
			// 		this.spinnerWallet = false
			// 	})
			// })
}
