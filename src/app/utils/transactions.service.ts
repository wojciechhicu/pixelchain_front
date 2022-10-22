import { Injectable } from '@angular/core';
import { Tx } from '../_helpers/trasaction.interface';
import { ConnectedPeers  as Peers} from '../_helpers/http-response/connected-peers.interface';

@Injectable({
	providedIn: 'root'
})
export class TransactionsService {


	constructor() { }

	getOnlyValidators(nodes: Peers[]): Peers[] {
		let finalData: Peers[] = [];
		nodes.forEach((val)=>{
			if(val.type === 'validator'){
				finalData.push(val)
			}
		})
		return finalData
	}
}
