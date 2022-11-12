import { Component, OnInit, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import * as EventEmitter from 'events';
import { HttpService } from 'src/app/utils/http.service';
import { tableData, pixelBalance, txsOverTime, feeSpent, pixelsTransfer,responseWalletTxs, creatDataTable, pixelBalanceChartData } from 'src/app/_helpers/wallet-transactions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-wallet-transactions',
	templateUrl: './wallet-transactions.component.html',
	styleUrls: ['./wallet-transactions.component.scss']
})
export class WalletTransactionsComponent implements OnInit, AfterViewInit {

	/** input wallet hash from component */
	@Input() walletHash: string = '';

	/** output */
	@Output() walletHashChange = new EventEmitter();

	/** table with transactions data */
	tableData: tableData[] = [];

	/** which columns to display */
	displayedColumns: string[] = ['txHash', 'blockHeight', 'timestamp', 'from','inOut', 'to', 'value', 'fee'];

	/** datasource of table */
	dataSource = new MatTableDataSource<tableData>();

	/** from string to display in or out */
	from: string = '';

	/** create paginator for table */
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	/** create sorter for table */
	@ViewChild(MatSort) sort!: MatSort;

	/** helper fn to display spinner while loading */
	spinner: boolean = true

	balance: pixelBalance[] = [];
	constructor(public http: HttpService, private router: Router, private aRoute: ActivatedRoute) { }

	ngOnInit(): void {
		this.fromWallet();
		this.getTransactions();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort
	}

	/** get transactions for wallet from blockchain */
	getTransactions() {
		if (this.walletHash.length >= 130 && this.walletHash.slice(0, 2) == '04') {
			this.http.connectToRandomNode().then((value) => {
				this.http.getWalletTransactions(this.walletHash, `${value.host}:${value.port}/get-wallet-transactions`).then((val) => {
					this.dataSource.data = creatDataTable(val);
					this.balance = pixelBalanceChartData(val, this.from);
					this.dataSource.paginator = this.paginator;
				}).then(()=>{
					this.spinner = false;
				})
			})
		}
	}

	/** create filter for received transactions */
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	/**
	 * Go to block component to get block data with this parameter
	 * @param block block number 
	 */
	goToBlock(block: number): void {
		this.router.navigate(['blockchain'], {queryParams: { block: block}})
	}

	/**
	 * go to transaction component with new hash parameter and reload page
	 * @param txHash transaction hash
	 */
	goToTransaction(txHash: string): void {
		this.router.navigate(['transactions'], {queryParams: { txHash: txHash}})
	}

	/**
	 * go to wallets component what is this but reload with new parameter
	 * @param wallet wallet hash
	 */
	goToWallet(wallet: string): void {
		this.router.navigate(['transactions'], {queryParams: {publicKey: wallet}}).then(()=>{
			window.location.reload()
		})
	}

	/** get public key param */
	fromWallet(): void{
		this.aRoute.queryParams.subscribe((params: any)=>{
			if(params.publicKey){
				this.from = params.publicKey;
			}
		})
	}
}