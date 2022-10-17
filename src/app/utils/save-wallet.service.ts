import { Injectable } from '@angular/core';
import { Data } from '../_helpers/wallet-list.interface';
import exportFromJSON from 'export-from-json'

@Injectable({
	providedIn: 'root'
})
export class SaveWalletService {

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
	public saveWallet(privateKey: string | undefined, publicKey: string | undefined): void {
		let historicalRawData = localStorage.getItem("walletsList");
		if (historicalRawData != null) {
			let historical: Data[] = JSON.parse(historicalRawData);
			let newData: Data = { privKey: privateKey, pubKey: publicKey };
			let numberOfPrivKeysInside: number = 0;
			historical.forEach((val)=>{
				if(val.privKey != newData.privKey){
					numberOfPrivKeysInside = numberOfPrivKeysInside + 1
					console.log(val.privKey)
				}
				
			})
			if(numberOfPrivKeysInside != 0){
				historical.push(newData);
				localStorage.setItem("walletsList", JSON.stringify(historical));
				window.location.reload()
			}

		} else {
			let newData: Data[] = [{ privKey: privateKey, pubKey: publicKey }];
			localStorage.setItem('walletsList', JSON.stringify(newData))
			window.location.reload()
		}
	}

	/**
	 * Download one created wallet as JSON
	 * @param privateKey private key of wallet
	 * @param publicKey public key of wallet
	 */
	public downloadWallet(privateKey: string | undefined, publicKey: string | undefined): void {
		const data: Data = {privKey: privateKey, pubKey: publicKey};
		const fileName: string = 'pixelChainWallet';
		const exportType = exportFromJSON.types.json;
		exportFromJSON({data, fileName, exportType })
	}

	public loadWallet(): void {

	}

	/**
	 * Delete all wallets from memory
	 */
	public deleteAllWallets(): void {
		localStorage.removeItem('walletsList');
		window.location.reload()
	}

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
}
