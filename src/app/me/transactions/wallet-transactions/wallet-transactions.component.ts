import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as EventEmitter from 'events';
import { HttpService } from 'src/app/utils/http.service';
import { tableData, picelBalance, txsOverTime, feeSpent, pixelsTransfer, creatDataTable } from 'src/app/_helpers/wallet-transactions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
	selector: 'app-wallet-transactions',
	templateUrl: './wallet-transactions.component.html',
	styleUrls: ['./wallet-transactions.component.scss'],
	animations: [
		trigger('fadeIn1', [
			transition(':enter', [
				style({ transform: 'translateX(+100%)' }),
				animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
			])
		]),
		trigger('fadeIn', [
			transition(':enter', [
				style({ opcacity: 0 }),
				animate('400ms ease-in', style({ opacity: 1 }))
			])
		])
	]
})
export class WalletTransactionsComponent implements OnInit {
	@Input() walletHash: string = '';
	@Output() walletHashChange = new EventEmitter();

	tableData: tableData[] = [];
	displayedColumns: string[] = ['txHash', 'blockHeight', 'timestamp', 'from', 'to', 'value', 'fee'];
	dataSource = new MatTableDataSource<tableData>()

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(public http: HttpService) { }

	ngOnInit(): void {
		this.getTransactions()
	}

	getTransactions() {
		if (this.walletHash.length >= 130 && this.walletHash.slice(0, 2) == '04') {
			this.http.connectToRandomNode().then((value) => {
				this.http.getWalletTransactions(this.walletHash, `${value.host}:${value.port}/get-wallet-transactions`).then((val) => {
					this.dataSource.data = creatDataTable(val);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort
				})
			})
		}
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}
//TODO w age dać np 25 minut temu zamiast timestamp
//TODO po najechaniu na age td pokazac mattoolbar z dokładną datą
//FIXME naprawić stylowanie responsive na każde RWD
//TODO dokumentacja kodu
//TODO dodać animację lub całkowicie usunąć przy zmianie tabsów
//TODO dodać spinner ładowania
//TODO dodać pustą kolumnę lub po prostu po from dać ikonkę out lub in zależnie od sposobu transakcji na portfelu