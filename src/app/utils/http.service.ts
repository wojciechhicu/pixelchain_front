import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConnectedPeers as Peers } from '../_helpers/http-response/connected-peers.interface';
import { SendTx } from '../_helpers/send-transaction.interface';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) {

	}

	getConnectedNodes() {
		return this.http.get<Peers[]>(environment.server.peerDiscover.connectedPeers)
	}

	sendTransaction(tx: SendTx, url: string){
		return this.http.post<SendTx>(url,tx);
	}
}
