import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectedPeers as Peers } from '../_helpers/http-response/connected-peers.interface';
import { SendTx } from '../_helpers/send-transaction.interface';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) {

	}

	getConnectedNodes() {
		return this.http.get<Peers[]>('http://localhost:3000/get-connected-nodes')
	}

	sendTransaction(tx: SendTx, url: string){
		return this.http.post<SendTx>(url,tx);
	}
}
