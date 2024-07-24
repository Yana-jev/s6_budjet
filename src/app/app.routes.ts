import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BudjetListComponent } from './budjet-list/budjet-list.component';


export const routes: Routes = [

{path: '', component: HomeComponent},
{path: 'list', component: BudjetListComponent},
{path: 'home', component: HomeComponent},


];
