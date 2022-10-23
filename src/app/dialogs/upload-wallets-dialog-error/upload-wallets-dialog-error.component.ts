import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/_helpers/wallet-upload.interface';

@Component({
	selector: 'app-upload-wallets-dialog-error',
	templateUrl: './upload-wallets-dialog-error.component.html',
	styleUrls: ['./upload-wallets-dialog-error.component.scss'],
})
export class UploadWalletsDialogErrorComponent implements OnInit {
	/**
	 * Custom error displayed after this message
	 */
	customErr = `TypeError: Cannot read properties of undefined (reading 'type')`;
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

	ngOnInit(): void {}
}
