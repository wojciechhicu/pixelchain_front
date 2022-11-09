import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SendTransaction } from 'src/app/_helpers/ready-to-send-transaction.interface';
import { HttpService } from 'src/app/utils/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

@Component({
	selector: 'app-mem-pool',
	templateUrl: './mem-pool.component.html',
	styleUrls: ['./mem-pool.component.scss'],
	animations: [
		trigger('detailExpand', [
			state(
				'collapsed',
				style({ height: '0px', minHeight: '0' })
			),
			state('expanded', style({ height: '*' })),
			transition(
				'expanded <=> collapsed',
				animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
			),
		]),
	],
})
export class MemPoolComponent implements OnInit, AfterViewInit {

	/** which columns are displayed */
	displayedColumns: string[] = ['from'];

	/** every transaction value combined */
	volume: number = 0;

	/** data source of table */
	dataSource = new MatTableDataSource<SendTransaction>();

	/** expanded columns */
	columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

	/** expanded element type declaration */
	expandedElement!: SendTransaction | null;

	/** init paginator */
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	/** connected nodes to network */
	connectedNodes = this.http.connectToRandomNode();

	/** delcaration of transactions in memory */
	txObjs: SendTransaction[] = [];

	/** helper value to show/hide loading spinner */
	spinner: boolean = false;

	constructor(public http: HttpService, private snack: MatSnackBar, private clip: Clipboard) {

	}

	ngOnInit(): void {
		this.refresh();
	}

	ngAfterViewInit(): void {

	}

	/** search for object */
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	/** refresh values in mempool */
	refresh(): void  {
		this.getMempool()
	}

	/**
	 * Copy text
	 * @param text text to copy
	 */
	copy(text: string){
		this.clip.copy(text);
		this.snack.open('Coppied to clipboard.', 'Close',{duration: 3000})
	}

	/**
	 * Get mempool info
	 */
	getMempool(): void{
		this.spinner = true;
		this.connectedNodes.then((value)=>{
			let mempool = this.http.getMempool(`${value.host}:${value.port}/mempool`);
			mempool.then((val)=>{
				this.dataSource.data = val;
				this.dataSource.paginator = this.paginator;
				this.dataSource.data.forEach((data)=>{
					this.volume += data.txValue;
				})
			}).then(()=>{
				this.spinner = false;
			})
		})
	}
}
