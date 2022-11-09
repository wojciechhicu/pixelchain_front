import { Injectable } from '@angular/core';
import { ConnectedPeers  as Peers} from '../_helpers/http-response/connected-peers.interface';
import * as elliptic from 'elliptic'
import { SHA256 } from 'crypto-js'
const ec = new elliptic.ec('secp256k1');


@Injectable({
	providedIn: 'root'
})
export class TransactionsService {


	constructor() { }

	/**
	 * Filter nodes array to get only nodes with validator consensus
	 * @param nodes all nodes connected to network
	 * @returns only peers with status validator
	 */
	getOnlyValidators(nodes: Peers[]): Peers[] {
		let finalData: Peers[] = [];
		nodes.forEach((val)=>{
			if(val.type === 'validator'){
				finalData.push(val)
			}
		})
		return finalData
	}

	/**
	 * Calculate SHA256 hash
	 * @param from public address from where transaction started
	 * @param to public address of pixels destination
	 * @param value value how much pixels must be send
	 * @param time current unix timestamp of creating transaction
	 * @returns hash as string of inputs
	 */
	public calcHash(from: string, to: string, value: number, time: number, fee: number): string{
		return SHA256(from + to + value + time + fee).toString()
	}	

	/**
	 * Check if transaction is correct before sending it to validator to prevent spam in network
	 * @param from Public key as address from where transaction were sent
	 * @param signature signature
	 * @param from2 Public key as address from where transaction were sent
	 * @param to Destination address of pixels
	 * @param txVal Value of transaction in pixels
	 * @param time timestamp of transaction when were made
	 * @returns true = valid; false = invalid
	 */
	public isValidTx(from: string, signature: string, from2: string, to: string, txVal: number, time: number, fee: number): boolean {
		if(from === null){
			return false;
		}
		if(!signature || signature.length === 0){
			return false
		}

		const pubKey = ec.keyFromPublic(from, 'hex');
		return pubKey.verify(this.calcHash(from2, to, txVal, time, fee), signature)
	}
}
