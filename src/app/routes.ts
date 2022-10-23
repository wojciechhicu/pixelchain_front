import { Routes } from "@angular/router";
import { StatsComponent } from './pixelscan/stats/stats.component';
import { BlocksComponent } from './pixelscan/blocks/blocks.component';
import { ValidatorsComponent } from './pixelscan/validators/validators.component';
import { WalletsComponent } from './me/wallets/wallets.component';
import { TransactionsComponent } from './me/transactions/transactions.component';
import { Error404Component } from './errors/error404/error404.component';
import { AboutComponent } from './other/about/about.component';
import { DocumentationComponent } from './other/documentation/documentation.component';
import { SettingsComponent } from './other/settings/settings.component';
import { CreateTxComponent } from './me/transactions/create-tx/create-tx.component';
import { VisualisationComponent } from "./other/visualisation/visualisation.component";
import { MemPoolComponent } from './pixelscan/mem-pool/mem-pool.component';

export const routes: Routes = [
        {
                path: '',
                redirectTo: 'about',
                pathMatch: 'full'
        },
        {
                path: 'stats',
                pathMatch: 'full',
                component: StatsComponent
        },
        {
                path: 'blockchain',
                pathMatch: 'full',
                component: BlocksComponent,
        },
        {
                path: 'validators',
                pathMatch: 'full',
                component: ValidatorsComponent
        },
        {
                path: 'mempool',
                pathMatch: 'full',
                component: MemPoolComponent
        },
        {
                path: 'wallets',
                pathMatch: 'full',
                component: WalletsComponent,
                
                
        },
        {
                path: 'transactions',
                pathMatch: 'full',
                component: TransactionsComponent,
        },
        {
                path: 'transactions/create-tx',
                pathMatch: 'full',
                component: CreateTxComponent,
        },
        {
                path: 'visualisation',
                pathMatch: 'full',
                component: VisualisationComponent
        },
        {
                path: 'about',
                pathMatch: 'full',
                component: AboutComponent
        },
        {
                path: 'documentation',
                pathMatch: 'full',
                component: DocumentationComponent
        },
        {
                path: 'settings',
                pathMatch: 'full',
                component: SettingsComponent
        },
        {
                path: '404',
                pathMatch: 'full',
                component: Error404Component
        },
        {
                path: '**',
                redirectTo: '404',
                pathMatch: 'full'
        }
]