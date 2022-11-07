import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { WalletService } from 'src/app/utils/wallet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmDialogConnectedWalletsComponent } from 'src/app/dialogs/confirm-dialog-connected-wallets/confirm-dialog-connected-wallets.component';
import { EditWalletNameDialogComponent } from 'src/app/dialogs/edit-wallet-name-dialog/edit-wallet-name-dialog.component';
import { RemoveWalletsDialogComponent } from '../../../dialogs/navigationDialogs/remove-wallets-dialog/remove-wallets-dialog.component';
import { ConfirmDeleteSelectedWalletsComponent } from 'src/app/dialogs/confirm-delete-selected-wallets/confirm-delete-selected-wallets.component';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/utils/http.service';
import { ConnectedPeers as Peer } from 'src/app/_helpers/http-response/connected-peers.interface';

@Component({
	selector: 'app-connected-wallets',
	templateUrl: './connected-wallets.component.html',
	styleUrls: ['./connected-wallets.component.scss'],
})
export class ConnectedWalletsComponent implements OnInit, AfterViewInit {
	loadData: Data[] = this.service.loadConnectedWallets();
	displayedColumns: string[] = [
		'select',
		'privKey',
		'pubKey',
		'name',
		'funds',
		'delete',
		'transaction',
		'editName',
	];
	dataSource = new MatTableDataSource<Data>(this.loadData);
	selection = new SelectionModel<Data>(true, []);
	spinner: boolean = false;
	pInWallets: number = 0;
	constructor(
		public service: WalletService,
		public dialog: MatDialog,
		public router: Router,
		public http: HttpService
	) {}

	ngOnInit(): void {
		this.getBalanceFromAllWallets();
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

	deleteSingleKey(privKey: string) {
		this.dialog.open(ConfirmDialogConnectedWalletsComponent, {
			data: {
				privKey: privKey,
			},
		});
	}

	downloadAllWallets(): void {
		this.service.downloadAllWallets();
	}

	goToTransactions(pubKey: string): void {
		this.router.navigate(['transactions'], {
			queryParams: { publicKey: pubKey },
		});
	}

	updateWalletNameDialog(privKey: string): void {
		this.dialog.open(EditWalletNameDialogComponent, {
			data: {
				privKey: privKey,
			},
		});
	}

	deleteAllWallets(): void {
		this.dialog.open(RemoveWalletsDialogComponent);
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}
	/** Selects all rows if they are not all selected; otherwise clear selection. */
	toggleAllRows() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		if (!row) {
			return `${
				this.isAllSelected() ? 'deselect' : 'select'
			} all`;
		}
		return `${
			this.selection.isSelected(row) ? 'deselect' : 'select'
		} row ${row.position + 1}`;
	}

	deleteSelectedKeys(): void {
		this.dialog.open(ConfirmDeleteSelectedWalletsComponent, {
			data: {
				keys: this.selection.selected,
			},
		});
	}

	refreshFundsForConnectedWallets(): void {
		this.spinner = true;
		this.http.connectToRandomNode().then((val: any)=>{
			const node: Peer = val;
			this.http.getWalletsBalances(this.getConnectedWallets(), `${node.host}:${node.port}/get-wallets-balance`).then((value)=>{
				this.service.editWalletBalances(value);
			}).then(()=>{
				this.spinner = false;
				window.location.reload();
			})
		})
	}

	private getConnectedWallets():string[]{
		const wallets: Data[] = this.service.loadConnectedWallets();
		let walletsPubKeys: string[] = [];
		wallets.forEach((val)=>{
			if(val.pubKey != undefined){
				walletsPubKeys.push(val.pubKey);
			}
		})
		return walletsPubKeys
	}

	getBalanceFromAllWallets(){
		this.dataSource.data.forEach((val, ind)=>{
			if(val.funds != undefined){
				this.pInWallets += val.funds;
			}
		})
	}
}
