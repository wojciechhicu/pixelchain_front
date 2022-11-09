import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from 'src/app/utils/wallet.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { UploadWalletsDialogErrorComponent } from 'src/app/dialogs/upload-wallets-dialog-error/upload-wallets-dialog-error.component';

@Component({
	selector: 'app-load-wallet',
	templateUrl: './load-wallet.component.html',
	styleUrls: ['./load-wallet.component.scss'],
})
export class LoadWalletComponent implements OnInit {
	/** selected file */
	file!: File;

	/** helper value */
	noErrors: boolean = true;

	/** file data init */
	fileData!: Data[];

	constructor(public wallet: WalletService, public dialog: MatDialog) { }

	ngOnInit(): void { }

	/**
	 * Check if conditions in file are correct
	 * @param event event to check file
	 */
	handleFileInputErrors(event: any) {
		try {
			/**
			 * check type
			 */
			if (event.target.files[0].type != 'application/json') {
				throw 'File type is not a JSON';
			}
			/**
			 * check size of file ~max 2mb
			 */
			if (event.target.files[0].size > 1307633) {
				throw 'File size is too big. Max 2MB';
			}

			/**
			 *
			 */
			try {
				this.file = event.target.files[0];
				let fileReader = new FileReader();
				fileReader.onload = (e) => {
					try {
						if (
							fileReader.result !=
							null &&
							typeof fileReader.result ===
							'string'
						) {
							let parsedJSON =
								JSON.parse(
									fileReader.result
								);
							if (
								this.wallet.checkCorrectStoringKeys(
									parsedJSON
								) != null
							) {
								let checkedData: Data[] =
									parsedJSON;
								let walletsInMemory: Data[] =
									this.wallet.loadConnectedWallets();
								checkedData.forEach(
									(
										val
									) => {
										let tmp =
											walletsInMemory.find(
												(
													element
												) =>
													element.privKey ==
													val.privKey
											);
										if (
											tmp ==
											undefined
										) {
											walletsInMemory.push(
												{
													privKey: val.privKey,
													pubKey: val.pubKey,
													name: val.name,
													funds: val.funds
												}
											);
										}
									}
								);
								localStorage.setItem(
									'walletsList',
									JSON.stringify(
										walletsInMemory
									)
								);
								window.location.reload();
							} else {
								throw 'Data is corrupted or stored not correctly';
							}
						} else {
							throw 'Cannot read file.';
						}
					} catch (err) {
						this.dialogOpen(err);
					}
				};
				fileReader.readAsText(this.file);
				this.noErrors = false;
			} catch (err) {
				this.dialogOpen(err);
			}
		} catch (err) {
			this.dialogOpen(err);
		}
	}

	/**
	 * Open dialog and send error message
	 * @param error
	 */
	private dialogOpen(error: unknown) {
		this.dialog.open(UploadWalletsDialogErrorComponent, {
			data: {
				criticalError: error,
			},
		});
	}
}
