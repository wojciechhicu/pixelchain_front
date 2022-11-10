import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

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
	constructor() {}

	ngOnInit(): void {}
}
