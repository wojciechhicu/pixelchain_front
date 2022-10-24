import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectedPeers as Peers } from '../_helpers/http-response/connected-peers.interface';
import { SendTx } from '../_helpers/send-transaction.interface';
import { SendTransaction } from '../_helpers/ready-to-send-transaction.interface';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) {

	}

	getConnectedNodes() {
		return this.http.get<Peers[]>(environment.router)
	}

	sendTransaction(tx: SendTx, url: string){
		return this.http.post<SendTx>(url,tx);
	}

	getMempool(url: string){
		return this.http.get<SendTransaction[]>(url)
	}
}
