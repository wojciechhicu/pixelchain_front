import { Component, OnInit } from '@angular/core';
import * as elliptic from 'elliptic';
import { WalletService } from 'src/app/utils/wallet.service';
const ec = new elliptic.ec('secp256k1');


@Component({
	selector: 'app-new-wallet',
	templateUrl: './new-wallet.component.html',
	styleUrls: ['./new-wallet.component.scss']
})
export class NewWalletComponent implements OnInit {

	pair: elliptic.ec.KeyPair = ec.genKeyPair();
	private: string = this.pair.getPrivate().toString('hex');
	public: string = this.pair.getPublic('hex');
	pairs: Pairs = {};
	length: number = 0;
	name: string = ''


	constructor(public walletService: WalletService) { }

	ngOnInit(): void {

	}

	public createWallet(): void {
		this.length = this.length + 1;
		this.pair = ec.genKeyPair();
		this.private = this.pair.getPrivate().toString('hex')
		this.public = this.pair.getPublic('hex')
		this.pairs = {
			pair: this.pair,
			private: this.private,
			public: this.public,
		}
	}

	public downloadWallet(): void {
		this.walletService.downloadWallet(this.pairs.private, this.pairs.public)
	}

	public saveWallet(): void {
		this.walletService.saveWallet(this.pairs.private, this.pairs.public)
	}
}
export interface Pairs {
	pair?: elliptic.ec.KeyPair;
	private?: string;
	public?: string;
}