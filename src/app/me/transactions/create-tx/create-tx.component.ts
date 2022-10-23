import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { WalletService } from 'src/app/utils/wallet.service';
import { HttpService } from 'src/app/utils/http.service';
import { TransactionsService } from 'src/app/utils/transactions.service';
import { ConnectedPeers as Peers } from 'src/app/_helpers/http-response/connected-peers.interface';
import * as elliptic from 'elliptic'
const ec = new elliptic.ec('secp256k1');
import { SHA256 } from 'crypto-js'

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

	constructor(public walletService: WalletService, public txService: TransactionsService) {}

	ngOnInit(): void {
		this.wallets = this.getWalletsFromMemory()
	}

	sendTransaction(from: any, to: string, txValue: number, fee: number){
		//bypass error of interfaces. By error there is Data[] interface not Data
		let correctFrom: Data = from;
		let data = {
			privKey: correctFrom.privKey,
			from: correctFrom.pubKey,
			to: to,
			txValue: txValue,
			fee: fee
		}

		if(data.privKey != undefined){
			let signingKey: elliptic.ec.KeyPair = ec.keyFromPrivate(data.privKey);
			let pub = signingKey.getPublic('hex');
			if( data.from === pub){
				const time = Date.now()
				const hashTx = this.calcHash(pub, data.to, data.txValue, time);
				const signature = signingKey.sign(hashTx).toDER('hex');
				if(data.from != undefined){
					const isValid: boolean = this.isValidTx(data.from, signature, data.from, data.to, data.txValue, time);
					console.log(isValid)
				}
				
			} else {
				console.log("błąd")
			}
		}
		
		







		
		// let nodes: Peers[] = [];
		// this.http.getConnectedNodes().subscribe((data: Peers[])=> {
		// 	let ldata = this.txService.getOnlyValidators(data)
		// 	ldata.forEach((val)=>{
		// 		nodes.push(val)
		// 	})
		// })
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

	private calcHash(from: string, to: string, value: number, time: number): string{
		return SHA256(from + to + value + time).toString()
	}	

	private isValidTx(from: string, signature: string, from2: string, to: string, txVal: number, time: number): boolean {
		if(from === null){
			return false;
		}
		if(!signature || signature.length === 0){
			return false // w tym miejscu jeśli nie ma signature dla transakcji
		}

		const pubKey = ec.keyFromPublic(from, 'hex');
		return pubKey.verify(this.calcHash(from2, to, txVal, time), signature)
	}
}