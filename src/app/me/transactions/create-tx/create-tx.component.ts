import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { WalletService } from 'src/app/utils/wallet.service';
import { HttpService } from 'src/app/utils/http.service';
import { TransactionsService } from 'src/app/utils/transactions.service';
import { ConnectedPeers as Peers } from 'src/app/_helpers/http-response/connected-peers.interface';
import * as elliptic from 'elliptic'
const ec = new elliptic.ec('secp256k1');

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

	constructor(public walletService: WalletService, public http: HttpService, public txService: TransactionsService) {}

	ngOnInit(): void {
		this.wallets = this.getWalletsFromMemory()
	}

	sendTransaction(from: any, to: string, txValue: number, fee: number){
		//bypass error of interfaces. By error there is Data[] interface not Data
		let correctFrom: Data = from;
		let data = {
			from: correctFrom.pubKey,
			to: to,
			txValue: txValue,
			fee: fee
		}

		let nodes: Peers[] = [];
		this.http.getConnectedNodes().subscribe((data: Peers[])=> {
			let ldata = this.txService.getOnlyValidators(data)
			ldata.forEach((val)=>{
				nodes.push(val)
			})
		})
		console.log(data)
		
	}

	/**
	 * Get all wallets saved in memory
	 * @returns list of wallets in memory
	 */
	getWalletsFromMemory(): Data[] {
		return this.walletService.loadConnectedWallets();
	}

	/**
	 * Check if form is valid
	 * @param from my address from where im sending pixels
	 * @param to address to send pixels
	 * @param txValue transaction value
	 * @param fee fee value for validator
	 * @returns true = is not valid; false = is valid
	 */
	checkData(from: Data[], to: string, txValue: number, fee: number): boolean {
		if(!from) { return true}
		if(to.length < 10) { return true }
		if( txValue == undefined ) { return true }
		if( txValue == null ) { return true }
		if( txValue < 1) { return true }
		if( fee < 1) { return true}
		if( fee == undefined ) { return true }
		if( fee == null ) { return true }
		return false
	}
}