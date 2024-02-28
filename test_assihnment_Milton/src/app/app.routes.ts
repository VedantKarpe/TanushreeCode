import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import {TablePageComponent} from './table-page/table-page.component';

// const routes: Routes = [
//     { path: '', component: MainPageComponent },
//     { path: 'second', component: TablePageComponent }
//   ];

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'tablePage', component: TablePageComponent }
];
