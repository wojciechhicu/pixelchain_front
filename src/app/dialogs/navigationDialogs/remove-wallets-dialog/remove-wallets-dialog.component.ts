import { Component, OnInit } from '@angular/core';
import { SaveWalletService } from 'src/app/utils/wallet.service';

@Component({
  selector: 'app-remove-wallets-dialog',
  templateUrl: './remove-wallets-dialog.component.html',
  styleUrls: ['./remove-wallets-dialog.component.scss']
})
export class RemoveWalletsDialogComponent implements OnInit {

  constructor(public wallet: SaveWalletService) { }

  ngOnInit(): void {
  }

  removeWallets(): void {
    this.wallet.deleteAllWallets()
  }
}
