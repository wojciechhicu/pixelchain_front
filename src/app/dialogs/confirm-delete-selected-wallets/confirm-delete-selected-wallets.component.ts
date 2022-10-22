import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletService } from 'src/app/utils/wallet.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';

@Component({
	selector: 'app-confirm-delete-selected-wallets',
	templateUrl: './confirm-delete-selected-wallets.component.html',
	styleUrls: ['./confirm-delete-selected-wallets.component.scss'],
})
export class ConfirmDeleteSelectedWalletsComponent implements OnInit {
	constructor(
		public wallet: WalletService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {}

	confirmDelete(data: Data[]): void {
		data.forEach((val) => {
			if (val.privKey != undefined) {
				this.wallet.deleteSingleKey(val.privKey);
			}
		});
	}
}
