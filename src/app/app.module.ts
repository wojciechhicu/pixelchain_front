//basic angular 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

// components
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
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }