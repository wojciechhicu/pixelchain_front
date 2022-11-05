/**
 * header of blockchain
 */
interface Header {
        version: number;
        hash: string;
        prevHash: string;
        height: number;
        timestamp: number;
        validator: string;
}

/**
 * How transaction in blockchain looks like
 */
export interface TX {
        from: string;
        to: string;
        signature: string;
        txValue: number;
        fee: number;
        timestamp: number;
        uTxo: number;
        TxHash: string;
        status?: number;
}

/**
 * One block in blockchain
 */
export interface Block {
        header: Header;
        transactions: TX[];
}