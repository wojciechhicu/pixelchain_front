/** Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/** Angular material modules import */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';

/** Angular custom pipes */
import { DateAgoPipe } from './utils/date-ago.pipe';

/** Components import */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatsComponent } from './pixelscan/stats/stats.component';
import { BlocksComponent } from './pixelscan/blocks/blocks.component';
import { ValidatorsComponent } from './pixelscan/validators/validators.component';
import { WalletsComponent } from './me/wallets/wallets.component';
import { TransactionsComponent } from './me/transactions/transactions.component';
import { Error404Component } from './errors/error404/error404.component';
import { AboutComponent } from './other/about/about.component';
import { DocumentationComponent } from './other/documentation/documentation.component';
import { SettingsComponent } from './other/settings/settings.component';
import { NewWalletComponent } from './me/wallets/new-wallet/new-wallet.component';
import { LoadWalletComponent } from './me/wallets/load-wallet/load-wallet.component';
import { ConnectedWalletsComponent } from './me/wallets/connected-wallets/connected-wallets.component';
import { RemoveWalletsDialogComponent } from './dialogs/navigationDialogs/remove-wallets-dialog/remove-wallets-dialog.component';
import { UploadWalletsDialogErrorComponent } from './dialogs/upload-wallets-dialog-error/upload-wallets-dialog-error.component';
import { ConfirmDialogConnectedWalletsComponent } from './dialogs/confirm-dialog-connected-wallets/confirm-dialog-connected-wallets.component';
import { EditWalletNameDialogComponent } from './dialogs/edit-wallet-name-dialog/edit-wallet-name-dialog.component';
import { ConfirmDeleteSelectedWalletsComponent } from './dialogs/confirm-delete-selected-wallets/confirm-delete-selected-wallets.component';
import { CreateTxComponent } from './me/transactions/create-tx/create-tx.component';
import { VisualisationComponent } from './other/visualisation/visualisation.component';
import { ConfirmSendTransactionComponent } from './dialogs/confirm-send-transaction/confirm-send-transaction.component';
import { ErrorSendingTransactionComponent } from './dialogs/error-sending-transaction/error-sending-transaction.component';
import { ErrorInTransactionComponent } from './dialogs/error-in-transaction/error-in-transaction.component';
import { MemPoolComponent } from './pixelscan/mem-pool/mem-pool.component';
import { FaucetComponent } from './me/faucet/faucet.component';
import { WwwComponent } from './other/documentation/www/www.component';
import { RouterComponent } from './other/documentation/router/router.component';
import { ValidatorComponent } from './other/documentation/validator/validator.component';
import { WalletTransactionsComponent } from './me/transactions/wallet-transactions/wallet-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ToolbarComponent,
    StatsComponent,
    BlocksComponent,
    ValidatorsComponent,
    WalletsComponent,
    TransactionsComponent,
    Error404Component,
    AboutComponent,
    DocumentationComponent,
    SettingsComponent,
    NewWalletComponent,
    LoadWalletComponent,
    ConnectedWalletsComponent,
    RemoveWalletsDialogComponent,
    UploadWalletsDialogErrorComponent,
    ConfirmDialogConnectedWalletsComponent,
    EditWalletNameDialogComponent,
    ConfirmDeleteSelectedWalletsComponent,
    CreateTxComponent,
    VisualisationComponent,
    ConfirmSendTransactionComponent,
    ErrorSendingTransactionComponent,
    ErrorInTransactionComponent,
    MemPoolComponent,
    FaucetComponent,
    WwwComponent,
    RouterComponent,
    ValidatorComponent,
    WalletTransactionsComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ClipboardModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
