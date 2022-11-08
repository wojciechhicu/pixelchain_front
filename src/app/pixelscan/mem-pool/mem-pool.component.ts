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
	displayedColumns: string[] = ['from'];
	volume: number = 0;
	dataSource = new MatTableDataSource<SendTransaction>();
	columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
	expandedElement!: SendTransaction | null;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	connectedNodes = this.http.connectToRandomNode();
	txObjs: SendTransaction[] = [];
	spinner: boolean = false;

	constructor(public http: HttpService, private snack: MatSnackBar, private clip: Clipboard) {

	}

	ngOnInit(): void {
		this.refresh();
	}

	ngAfterViewInit(): void {

	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	refresh(): void  {
		this.getMempool()
	}

	copy(text: string){
		this.clip.copy(text);
		this.snack.open('Coppied to clipboard.', 'Close',{duration: 3000})
	}

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
