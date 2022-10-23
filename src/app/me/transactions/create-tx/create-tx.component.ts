import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { WalletService } from 'src/app/utils/wallet.service';
import { TransactionsService } from 'src/app/utils/transactions.service';
import { SendTransaction } from 'src/app/_helpers/ready-to-send-transaction.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSendTransactionComponent } from '../../../dialogs/confirm-send-transaction/confirm-send-transaction.component';
import { ErrorInTransactionComponent } from '../../../dialogs/error-in-transaction/error-in-transaction.component';
import * as elliptic from 'elliptic';

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

	constructor(public walletService: WalletService, public txService: TransactionsService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.wallets = this.getWalletsFromMemory()
	}

	/**
	 * Send transaction to confirm dialog but before check if everything is stores correctly if yes then send transaction if not show error dialog.
	 * @param from object with private key, public key, name of the wallet
	 * @param to public address of wallet where to send transaction
	 * @param txValue value in pixels how much to send
	 * @param fee value of fee for transaction
	 */
	sendTransactionToConfirmDialog(from: any, to: string, txValue: number, fee: number){
		try {
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
					const hashTx = this.txService.calcHash(pub, data.to, data.txValue, time);
					const signature = signingKey.sign(hashTx).toDER('hex');
					if(data.from != undefined){
						const isValid: boolean = this.txService.isValidTx(data.from, signature, data.from, data.to, data.txValue, time);
						if( isValid === true){
							const transaction: SendTransaction = {
								from: data.from,
								to: data.to,
								signature: signature,
								txValue: data.txValue,
								fee: data.fee,
								timestamp: time
							}
							this.dialog.open(ConfirmSendTransactionComponent, {
								data: transaction
							});
						} else {
							this.dialog.open(ErrorInTransactionComponent);
						}
					}
				} else {
					this.dialog.open(ErrorInTransactionComponent);
				}
			}
		} catch(e){
			this.dialog.open(ErrorInTransactionComponent);
		}
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