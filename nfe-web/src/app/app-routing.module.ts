import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from "./app.component";
import {ProcessarComponent} from "./nfe/processar/processar.component";
import {NfeComponent} from "./nfe/nfe.component";
import {ListarNfeComponent} from "./nfe/listar-nfe/listar-nfe.component";

const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'nfe',
        component: NfeComponent,
        children: [
          {path: '', component: ProcessarComponent},
          {path: 'listagem', component: ListarNfeComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
