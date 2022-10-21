import { Injectable } from '@angular/core';
import { Data } from '../_helpers/wallet-list.interface';
import * as elliptic from 'elliptic';
const ec = new elliptic.ec('secp256k1');
import exportFromJSON from 'export-from-json'

@Injectable({
	providedIn: 'root'
})
export class WalletService {

	constructor() { }

	/**
	 * Find if there is any saved wallet and if yes then count them
	 * @returns numbers of saved wallets
	 */
	public numberOfWallets(): number {
		let listOfWallets = localStorage.getItem("walletsList");

		if(listOfWallets != null){
			let parsedWallets: Data[] = JSON.parse(listOfWallets);
			if(parsedWallets.length > 0){
				return parsedWallets.length
			}
		}
		if(listOfWallets == null){
			return 0
		}
		return 0
	}

	/**
	 * Add wallet to localstorage memory
	 * @param privateKey private key of wallet
	 * @param publicKey  public key of wallet
	 */
	public saveWallet(privateKey: string | undefined, publicKey: string | undefined, name: string): void {
		let historicalRawData = localStorage.getItem("walletsList");
		if (historicalRawData != null) {
			let historical: Data[] = JSON.parse(historicalRawData);
			let newData: Data = { privKey: privateKey, pubKey: publicKey, name: name };
			let numberOfPrivKeysInside: number = 0;
			historical.forEach((val)=>{
				if(val.privKey != newData.privKey){
					numberOfPrivKeysInside = numberOfPrivKeysInside + 1
				}
				
			})
			if(numberOfPrivKeysInside != 0){
				historical.push(newData);
				localStorage.setItem("walletsList", JSON.stringify(historical));
				window.location.reload()
			}

		} else {
			let newData: Data[] = [{ privKey: privateKey, pubKey: publicKey, name: name }];
			localStorage.setItem('walletsList', JSON.stringify(newData))
			window.location.reload()
		}
	}

	/**
	 * Download one created wallet as JSON
	 * @param privateKey private key of wallet
	 * @param publicKey public key of wallet
	 * @param name name of wallet string or empty
	 */
	public downloadWallet(privateKey: string | undefined, publicKey: string | undefined, name: string): void {
		const data: Data[] = [{privKey: privateKey, pubKey: publicKey, name: name}];
		const fileName: string = 'pixelChainWallet';
		const exportType = exportFromJSON.types.json;
		exportFromJSON({data, fileName, exportType })
	}

	/**
	 * Delete all wallets from memory
	 */
	public deleteAllWallets(): void {
		localStorage.removeItem('walletsList');
		window.location.reload()
	}

	/**
	 * Load all connected wallets from localstorage and show them in table
	 * @returns 
	 */
	public loadConnectedWallets(): Data[]{
		let wallets = localStorage.getItem('walletsList');
		if(wallets != null){
			let parsedWallets: Data[] = JSON.parse(wallets);
			return parsedWallets
		} else {
			let noWallets: Data[] = [];
			return noWallets
		}
	}

	/**
	 * Check if there are correct keys in JSON object
	 * @param data full data readed
	 * @returns null if there is any error or full object if keys are correct
	 */
	public checkCorrectStoringKeys(data: any): Data[] | null {
		let check: Data[] = data;
		let balanceTMP: number = 0;
		if(check.length > 0){
			check.forEach((val)=>{
				if(!(val.privKey && val.pubKey)){
					throw "Not correct data"
				}
			})
			if(balanceTMP > 0){
				return null
			} else {
				return check
			}
		} else {
			return null
		}
	}

	/**
	 * Download full list of wallets as JSON file
	 */
	public downloadAllWallets(): void {
		const data: Data[] = this.loadConnectedWallets();
		const fileName: string = 'my-wallets-list';
		const exportType = exportFromJSON.types.json;
		exportFromJSON({data, fileName, exportType })
	}
	
	/**
	 * Delete single key from localstorage
	 * @param privKey private key as string
	 */
	public deleteSingleKey(privKey: string): void {
		let connectedWallets: Data[] = this.loadConnectedWallets();
		let index: number = 0;
		connectedWallets.forEach((val,ind)=>{
			if(val.privKey === privKey){
				index = ind;
			}
		})
		connectedWallets.splice(index ,1);
		localStorage.setItem("walletsList", JSON.stringify(connectedWallets))
		window.location.reload()
	}

	/**
	 * Edit label for wallet
	 * @param privKey private key as ID
	 * @param newName new name for wallet
	 */
	public editWalletName(privKey: string, newName: string): void {
		let connectedWallets: Data[] = this.loadConnectedWallets();
		connectedWallets.forEach((val)=>{
			if(val.privKey === privKey){
				val.name = newName;
			}
		})
		localStorage.setItem("walletsList", JSON.stringify(connectedWallets))
		window.location.reload()
	}
}
