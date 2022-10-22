import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-create-tx',
	templateUrl: './create-tx.component.html',
	styleUrls: ['./create-tx.component.scss'],
})
export class CreateTxComponent implements OnInit {
	
	from: string = '';
	to: string = '';
	txValue!: number;
	fee!: number;

	constructor() {}

	ngOnInit(): void {}

	sendTransaction(from: string, to: string, txValue: number, fee: number){
		
	}
}