import { WalletService } from 'src/app/utils/wallet.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivateKey } from 'src/app/_helpers/wallet-connect.interface';

@Component({
	selector: 'app-confirm-dialog-connected-wallets',
	templateUrl: './confirm-dialog-connected-wallets.component.html',
	styleUrls: ['./confirm-dialog-connected-wallets.component.scss'],
})
export class ConfirmDialogConnectedWalletsComponent implements OnInit {
	constructor(
		public wallet: WalletService,
		@Inject(MAT_DIALOG_DATA) public data: PrivateKey
	) {}

	ngOnInit(): void {}

	/**
	 * Delete single key pair from memory
	 * @param privKey private key as ID
	 */
	public confirmDelete(privKey: string): void {
		this.wallet.deleteSingleKey(privKey);
	}
}
