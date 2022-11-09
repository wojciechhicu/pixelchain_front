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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-connected-wallets',
	templateUrl: './connected-wallets.component.html',
	styleUrls: ['./connected-wallets.component.scss'],
})
export class ConnectedWalletsComponent implements OnInit, AfterViewInit {
	/** load connected wallets */
	loadData: Data[] = this.service.loadConnectedWallets();

	/** columns to display in table */
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

	/** Datasource of table */
	dataSource = new MatTableDataSource<Data>(this.loadData);

	/** selected rows */
	selection = new SelectionModel<Data>(true, []);

	/** helper method to hide/show spinner loading */
	spinner: boolean = false;

	/** how many pixels are in wallet */
	pInWallets: number = 0;
	
	constructor(
		public service: WalletService,
		public dialog: MatDialog,
		public router: Router,
		public http: HttpService,
		private snack: MatSnackBar
	) {}

	ngOnInit(): void {
		this.getBalanceFromAllWallets();
	}

	/**init paginator  */
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	/** use paginator */
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	/** add filter to table */
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	/**
	 * Delete single wallet address from memory with specyfied private key
	 * @param privKey private key as index
	 */
	deleteSingleKey(privKey: string) {
		this.dialog.open(ConfirmDialogConnectedWalletsComponent, {
			data: {
				privKey: privKey,
			},
		});
	}

	/**
	 * Download all wallets as json
	 */
	downloadAllWallets(): void {
		this.service.downloadAllWallets();
	}

	/**
	 * Redirect to transactions component with publickey as param to recive transactions for this wallet
	 * @param pubKey wallet address to search for
	 */
	goToTransactions(pubKey: string): void {
		this.router.navigate(['transactions'], {
			queryParams: { publicKey: pubKey },
		});
	}

	/**
	 * update wallet name in memory which specyfied priv index
	 * @param privKey private key as index
	 */
	updateWalletNameDialog(privKey: string): void {
		this.dialog.open(EditWalletNameDialogComponent, {
			data: {
				privKey: privKey,
			},
		});
	}

	/**
	 * Delete all wallets from memory
	 */
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

	/**
	 * Delete selected wallets from memory
	 */
	deleteSelectedKeys(): void {
		this.dialog.open(ConfirmDeleteSelectedWalletsComponent, {
			data: {
				keys: this.selection.selected,
			},
		});
	}

	/**
	 * Send request to random node to check balances of every wallet
	 */
	refreshFundsForConnectedWallets(): void {
		this.spinner = true;
		this.http.connectToRandomNode().then((val: any)=>{
			const node: Peer = val;
			this.http.getWalletsBalances(this.getConnectedWallets(), `${node.host}:${node.port}/get-wallets-balance`).then((value)=>{
				this.service.editWalletBalances(value);
			}).then((obs)=>{
				this.spinner = false;
				window.location.reload();
			})
		})
	}

	/**
	 * Get connected wallets in memory
	 * @returns connected wallets
	 */
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

	/**
	 * Get balance from all wallets in memory
	 */
	getBalanceFromAllWallets(){
		this.dataSource.data.forEach((val, ind)=>{
			if(val.funds != undefined){
				this.pInWallets += val.funds;
			}
		})
	}
}
