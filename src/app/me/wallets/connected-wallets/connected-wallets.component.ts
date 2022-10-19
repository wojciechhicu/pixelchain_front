import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/_helpers/wallet-list.interface';
import { SaveWalletService } from 'src/app/utils/wallet.service';

@Component({
  selector: 'app-connected-wallets',
  templateUrl: './connected-wallets.component.html',
  styleUrls: ['./connected-wallets.component.scss']
})
export class ConnectedWalletsComponent implements OnInit {

  loadData: Data[] = this.service.loadConnectedWallets()
  displayedColumns: string[] = ['privKey', 'pubKey'];
  dataSource = this.loadData;

  constructor(public service: SaveWalletService) { }

  ngOnInit(): void {
  }

}