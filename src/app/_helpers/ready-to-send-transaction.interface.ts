export interface SendTransaction {
        from: string;
        to: string;
        signature: string;
        txValue: number;
        fee: number;
        timestamp: number;
}