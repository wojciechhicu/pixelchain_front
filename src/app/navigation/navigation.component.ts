import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SaveWalletService } from '../utils/save-wallet.service';
import { MatDialog } from '@angular/material/dialog';
import { RemoveWalletsDialogComponent } from '../dialogs/navigationDialogs/remove-wallets-dialog/remove-wallets-dialog.component';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
	mobileQuery!: MediaQueryList;
	numberOfWallets: number = 0;

	private _mobileQueryListener: () => void;
	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public wallets: SaveWalletService, public dialog: MatDialog) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
		this.numberOfWallets = wallets.numberOfWallets();
		
	}

	ngOnInit(): void { }

	public removeWalletsDialog(): void {
		this.dialog.open(RemoveWalletsDialogComponent);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}


}
