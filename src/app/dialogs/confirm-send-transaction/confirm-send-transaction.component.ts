import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorSendingTransactionComponent } from '../error-sending-transaction/error-sending-transaction.component';
import { ConnectedPeers as Peers } from 'src/app/_helpers/http-response/connected-peers.interface';
import { HttpService } from 'src/app/utils/http.service';
import { SendTransaction } from 'src/app/_helpers/ready-to-send-transaction.interface';

@Component({
  selector: 'app-confirm-send-transaction',
  templateUrl: './confirm-send-transaction.component.html',
  styleUrls: ['./confirm-send-transaction.component.scss']
})
export class ConfirmSendTransactionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SendTransaction) { }

  ngOnInit(): void {
  }

}
