/**
 * response from router with list  of connected peers
 */
export interface ConnectedPeers {
        host: string;
        port: number;
        type: string;
        wallet: string;
}