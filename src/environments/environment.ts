// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	server: {
		baseUrl: 'http://localhost',
		peerDiscover: {
			baseUrl: 'http://localhost',
			port: 3000,
			connectedPeers: 'http://localhost:3000/get-connected-nodes',
			connectPeer: 'http://localhost:3000/connect-node'
		}
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
