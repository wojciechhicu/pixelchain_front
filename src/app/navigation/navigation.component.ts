import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../utils/wallet.service';
import { MatDialog } from '@angular/material/dialog';
import { RemoveWalletsDialogComponent } from '../dialogs/navigationDialogs/remove-wallets-dialog/remove-wallets-dialog.component';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {

	/**search for mobile version */
	mobileQuery!: MediaQueryList;

	/** helper value to display in mat badge */
	numberOfWallets: number = 0;

	/** listen for mobile size screen */
	private _mobileQueryListener: () => void;

	constructor(
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		public wallets: WalletService,
		public dialog: MatDialog
	) {
		/** mobile screen functions */
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () =>
			changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
		this.numberOfWallets = wallets.numberOfWallets();
	}

	ngOnInit(): void {}

	/**
	 * open dialog to confirm if user want to realy delete all wallets from memory
	 */
	public removeWalletsDialog(): void {
		this.dialog.open(RemoveWalletsDialogComponent);
	}

	/**
	 * when mobile screen is false then remove it from listeners
	 */
	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
