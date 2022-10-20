import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { WalletService } from 'src/app/utils/wallet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogConnectedWalletsComponent } from 'src/app/dialogs/confirm-dialog-connected-wallets/confirm-dialog-connected-wallets.component';
import { EditWalletNameDialogComponent } from 'src/app/dialogs/edit-wallet-name-dialog/edit-wallet-name-dialog.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-connected-wallets',
	templateUrl: './connected-wallets.component.html',
	styleUrls: ['./connected-wallets.component.scss']
})
export class ConnectedWalletsComponent implements OnInit, AfterViewInit {

	loadData: Data[] = this.service.loadConnectedWallets()
	displayedColumns: string[] = ['privKey', 'pubKey', 'name', 'delete', 'transaction', 'editName'];
	dataSource = new MatTableDataSource<Data>(this.loadData);

	constructor(public service: WalletService, public dialog: MatDialog, public router: Router) { }

	ngOnInit(): void {
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	deleteSingleKey(privKey: string){
		this.dialog.open(ConfirmDialogConnectedWalletsComponent, {
			data: {
				privKey: privKey
			}
		})
	}

	downloadAllWallets(): void {
		this.service.downloadAllWallets();
	}

	goToTransactions(pubKey: string): void {
		this.router.navigate(['transactions'], {
			queryParams: {publicKey: pubKey}
		})
	}

	updateWalletNameDialog(privKey: string): void {
		this.dialog.open(EditWalletNameDialogComponent,{
			data: {
				privKey: privKey
			}
		})
	}
}