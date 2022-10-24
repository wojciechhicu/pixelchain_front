import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MemPoolService } from 'src/app/utils/mem-pool.service';
import { SendTransaction } from 'src/app/_helpers/ready-to-send-transaction.interface';
import { HttpService } from 'src/app/utils/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
	dataSource = new MatTableDataSource<SendTransaction>();
	columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
	expandedElement!: SendTransaction | null;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	connectedNodes = this.http.getConnectedNodes();
	loading: boolean = false;
	txObjs: SendTransaction[] = [];

	constructor(public http: HttpService) {
		this.connectedNodes.subscribe((nodes) => {
			let index: number = Math.floor(
				Math.random() * nodes.length
			);
			let mempool: any = this.http.getMempool(
				`${nodes[index].host}:${nodes[index].port}/mempool`
			);
			mempool.subscribe((obs: any) => {
				
				this.dataSource.data = JSON.parse(obs);
				this.dataSource.paginator = this.paginator;
			});
		});
	}

	ngOnInit(): void {

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
}
