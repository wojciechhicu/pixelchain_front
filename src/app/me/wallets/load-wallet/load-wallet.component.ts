import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveWalletService } from 'src/app/utils/wallet.service';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { UploadWalletsDialogErrorComponent } from 'src/app/dialogs/upload-wallets-dialog-error/upload-wallets-dialog-error.component';

@Component({
	selector: 'app-load-wallet',
	templateUrl: './load-wallet.component.html',
	styleUrls: ['./load-wallet.component.scss']
})
export class LoadWalletComponent implements OnInit {

	//selectedFile: File;
	file!: File;
	helperCount: number = 0;
	noErrors: boolean = true;
	fileData!: Data[]


	constructor(public wallet: SaveWalletService, public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	handleFileInputErrors(event: any) {
		try {
			/**
			 * check type
			 */
			if(event.target.files[0].type != "application/json"){
				throw "File type is not a JSON";
			}
			/**
			 * check size of file ~max 2mb
			 */
			if(event.target.files[0].size > 1307633){
				throw "File size is too big. Max 2MB"
			}

			this.file = event.target.files[0];
			let fileReader = new FileReader();
			fileReader.onload = (e) =>{
				if(fileReader.result != null && typeof fileReader.result === 'string'){
					let test = JSON.parse(fileReader.result)
					console.log(test)

				}


			}
			fileReader.readAsText(this.file)
			this.noErrors = false;

		} catch( err) {
			this.dialog.open(UploadWalletsDialogErrorComponent,{
				data: {
					criticalError: err
				}
			})
		}
	}

	public uploadFile():void {

	}
}
