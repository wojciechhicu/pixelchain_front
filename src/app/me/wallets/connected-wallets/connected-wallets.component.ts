import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { SaveWalletService } from 'src/app/utils/wallet.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-connected-wallets',
	templateUrl: './connected-wallets.component.html',
	styleUrls: ['./connected-wallets.component.scss']
})
export class ConnectedWalletsComponent implements OnInit, AfterViewInit {

	loadData: Data[] = this.service.loadConnectedWallets()
	displayedColumns: string[] = ['privKey', 'pubKey', 'delete'];
	dataSource = new MatTableDataSource<Data>(this.loadData);

	constructor(public service: SaveWalletService) { }

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

	deleteSingleKey(privKey: string, pubKey: string){
		this.service.deleteSingleKey(privKey, pubKey);
	}
}