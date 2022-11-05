/**
 * Single element of list how wallets are stored in memory
 */
export interface Data {
	pubKey: string | undefined;
	privKey: string | undefined;
	name?: string;
	funds?: number;
}
