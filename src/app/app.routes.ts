import { Routes,ExtraOptions } from '@angular/router';
import { Componenet1Component } from './componenet1/componenet1.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UploadComponentComponent } from './upload-component/upload-component.component';
import { TableComponent } from './table/table.component';
import { Table1Component } from './table1/table1.component';

export const routes: Routes = [
    {path:'',component:TableComponent},
    {path:'sidenav',component:Componenet1Component},
    {path:'upload',component:UploadComponentComponent},
    {path:'table',component:TableComponent},
    {path:'table1',component:Table1Component},
    {path:'**',component:NotFoundComponent}
];

export const routerOptions:ExtraOptions={
    scrollPositionRestoration:'enabled',
    anchorScrolling:'enabled'
}