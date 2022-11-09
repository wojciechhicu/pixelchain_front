import { Component, OnInit } from '@angular/core';
import * as elliptic from 'elliptic';
import { WalletService } from 'src/app/utils/wallet.service';
const ec = new elliptic.ec('secp256k1');

@Component({
	selector: 'app-new-wallet',
	templateUrl: './new-wallet.component.html',
	styleUrls: ['./new-wallet.component.scss'],
})
export class NewWalletComponent implements OnInit {

	/** keypair init */
	pair: elliptic.ec.KeyPair = ec.genKeyPair();

	/** private key generete from pair */
	private: string = this.pair.getPrivate().toString('hex');

	/** public key from pair */
	public: string = this.pair.getPublic('hex');

	/** init pair object */
	pairs: Pairs = {};

	/** helper car to display values */
	length: number = 0;

	/** wallet name init as empty string but might be added by user */
	name: string = '';

	/** funds in wallet init it as 0*/
	funds: number = 0;

	constructor(public walletService: WalletService) {}

	ngOnInit(): void {}

	/**
	 * Create wallet fn and create object + show it
	 */
	public createWallet(): void {
		this.length = this.length + 1;
		this.pair = ec.genKeyPair();
		this.private = this.pair.getPrivate().toString('hex');
		this.public = this.pair.getPublic('hex');
		this.pairs = {
			pair: this.pair,
			private: this.private,
			public: this.public,
		};
	}

	/**
	 * Download created object as json
	 */
	public downloadWallet(): void {
		this.walletService.downloadWallet(
			this.pairs.private,
			this.pairs.public,
			this.name,
			this.funds
		);
	}

	/**
	 * Save wallet to memory
	 */
	public saveWallet(): void {
		this.walletService.saveWallet(
			this.pairs.private,
			this.pairs.public,
			this.name
		);
	}
}

/** Key pairs object just used here */
export interface Pairs {
	pair?: elliptic.ec.KeyPair;
	private?: string;
	public?: string;
}
