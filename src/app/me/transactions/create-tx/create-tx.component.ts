import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { WalletService } from 'src/app/utils/wallet.service';

@Component({
	selector: 'app-create-tx',
	templateUrl: './create-tx.component.html',
	styleUrls: ['./create-tx.component.scss'],
})
export class CreateTxComponent implements OnInit {
	
	from!: Data[];
	wallets!: Data[];
	to: string = '';
	txValue!: number;
	fee!: number;

	constructor(public walletService: WalletService) {}

	ngOnInit(): void {
		this.wallets = this.getWalletsFromMemory()
	}

	sendTransaction(from: Data[], to: string, txValue: number, fee: number){
		let obj = JSON.stringify(from + to + txValue + fee);
		console.log(from)
	}

	getWalletsFromMemory(): Data[] {
		return this.walletService.loadConnectedWallets();
	}

	checkData(from: Data[], to: string, txValue: number, fee: number): boolean {
		if(!from) { return true}
		if(to.length < 10) { return true }
		if( txValue < 1) { return true }
		if( fee < 1) { return true}
		return false
	}
}