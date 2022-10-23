import { Component, OnInit } from '@angular/core';
import { MemPoolService } from 'src/app/utils/mem-pool.service';

@Component({
  selector: 'app-mem-pool',
  templateUrl: './mem-pool.component.html',
  styleUrls: ['./mem-pool.component.scss']
})
export class MemPoolComponent implements OnInit {

  constructor(public memory: MemPoolService) { }

  ngOnInit(): void {
  }

}
