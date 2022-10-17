import { Component, OnInit } from '@angular/core';
import { SaveWalletService } from 'src/app/utils/save-wallet.service';

@Component({
  selector: 'app-load-wallet',
  templateUrl: './load-wallet.component.html',
  styleUrls: ['./load-wallet.component.scss']
})
export class LoadWalletComponent implements OnInit {

  fileToUpload: File | null = null;

  constructor(public wallet: SaveWalletService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
}
