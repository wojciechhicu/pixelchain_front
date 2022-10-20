import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
	pubKey: any;
	constructor(public aRoute: ActivatedRoute, public router: Router) {
		this.aRoute.queryParams.subscribe((params: any) => {
			this.pubKey = params.publicKey
		})
	 }

	ngOnInit(): void {

	}

}
