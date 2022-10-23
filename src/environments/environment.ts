export const environment = {
	production: false,
	server: {
		baseUrl: 'http://localhost',
		peerDiscover: {
			baseUrl: 'http://localhost',
			port: 3000,
			connectPeer: 'http://localhost:3000/connect-node'
		}
	}
};
