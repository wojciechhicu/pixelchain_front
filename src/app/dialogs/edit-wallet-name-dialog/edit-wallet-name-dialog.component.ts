import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivateKey } from 'src/app/_helpers/wallet-connect.interface';
import { WalletService } from 'src/app/utils/wallet.service';

@Component({
	selector: 'app-edit-wallet-name-dialog',
	templateUrl: './edit-wallet-name-dialog.component.html',
	styleUrls: ['./edit-wallet-name-dialog.component.scss'],
})
export class EditWalletNameDialogComponent implements OnInit {
	/**
	 * new name for specyfic key pair
	 */
	newName: string = '';
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: PrivateKey,
		public wallet: WalletService
	) {}

	ngOnInit(): void {}

	/**
	 * Edit wallet name stored in memory
	 * @param privKey private key used as ID
	 * @param newName new name for this key pair
	 */
	editWalletName(privKey: string, newName: string): void {
		this.wallet.editWalletName(privKey, newName);
	}
}
