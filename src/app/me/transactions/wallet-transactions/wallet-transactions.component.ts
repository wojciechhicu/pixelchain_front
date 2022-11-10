import { Component, OnInit, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as EventEmitter from 'events';
import { HttpService } from 'src/app/utils/http.service';


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
	constructor(public http: HttpService) {}

	ngOnInit(): void {
		this.getTransactions()
	}

	getTransactions(){
		if( this.walletHash.length >= 130 && this.walletHash.slice(0,2) == '04'){
			this.http.connectToRandomNode().then((value)=>{
				this.http.getWalletTransactions(this.walletHash, `${value.host}:${value.port}/get-wallet-transactions`).then((val)=>{
					console.log(val)
				})
			})
		}
	}
}
