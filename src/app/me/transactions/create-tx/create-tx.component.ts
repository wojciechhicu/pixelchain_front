import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { WalletService } from 'src/app/utils/wallet.service';
import { TransactionsService } from 'src/app/utils/transactions.service';
import { SendTransaction } from 'src/app/_helpers/ready-to-send-transaction.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSendTransactionComponent } from '../../../dialogs/confirm-send-transaction/confirm-send-transaction.component';
import { ErrorInTransactionComponent } from '../../../dialogs/error-in-transaction/error-in-transaction.component';
import * as elliptic from 'elliptic';
import { FormControl, Validators } from '@angular/forms';
import { minValue, check04 } from 'src/app/utils/custom-validators';

const ec = new elliptic.ec('secp256k1');

@Component({
	selector: 'app-create-tx',
	templateUrl: './create-tx.component.html',
	styleUrls: ['./create-tx.component.scss'],
})
export class CreateTxComponent implements OnInit {
	
	from!: Data[];
	wallets!: Data[];
	to = new FormControl('', [Validators.required, check04()]);
	txValue = new FormControl(null, [Validators.required, minValue(0.0000001)]);
	fee = new FormControl(null, [Validators.required, minValue(0.0000001)]);
	balance!: number;

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
	sendTransaction(from: any, to: string, txValue: number, fee: number){
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
					const hashTx = this.txService.calcHash(pub, data.to, data.txValue * 10000000, time, data.fee * 10000000);
					const signature = signingKey.sign(hashTx).toDER('hex');
					if(data.from != undefined){
						const isValid: boolean = this.txService.isValidTx(data.from, signature, data.from, data.to, data.txValue * 10000000, time, data.fee * 10000000);
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
					} else {
						this.dialog.open(ErrorInTransactionComponent);
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
	checkData(from: Data[]): boolean {
		if(!from) { return true}
		if( this.to.value.length < 130) { return true }
		if( this.txValue.value == undefined ) { return true }
		if( this.txValue.value == null ) { return true }
		if( this.txValue.value < 0) { return true }
		if( this.fee.value < 0) { return true}
		if( this.fee.value == undefined ) { return true }
		if( this.fee.value == null ) { return true }
		return false
	}

	/**
	 * Set balance in hint for a wallet
	 * @param balance balance of clicked wallet
	 */
	setBalance(balance: number | undefined): void {
		if(balance != undefined){
			this.balance = balance
		}
	}

	/**
	 * Check if in input is any error by validating it
	 * @returns string of error into html
	 */
	getErrorMessageTo(){
		if(this.to.hasError('required')){
			return 'You must enter a value';
		}
		if(this.to.hasError('start') != null){
			return "It's not correct wallet address!"
		}
		return this.to.hasError('minlength') ? 'Wallet need to have 130 letters length' : ''
	}

	/**
	 * Check if in input is any error by validating it
	 * @returns string of error into html
	 */
	getErrorMessagetxValue(){
		return this.txValue.hasError('isMinValue') != null ? 'Place value higher than 0.0000001' : ''
	}

	/**
	 * Check if in input is any error by validating it
	 * @returns string of error into html
	 */
	getErrorMessageFee(){
		return this.fee.hasError('isMinValue') != null ? 'Place value higher than 0.0000001' : ''
	}

	test(){
		console.log(`To: ${this.to.value}; TxValue: ${this.txValue.value}; Fee: ${this.fee.value}`)
	}

	sendTxToDialog(){
		this.sendTransaction(this.from, this.to.value, this.txValue.value, this.fee.value)
	}
}//TODO sprawdzić czy wallet z którego jest wysyłana transakcja jest inny od tego do którego wysyłamy
//TODO dokumentacja kodu