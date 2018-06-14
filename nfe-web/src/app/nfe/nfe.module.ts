import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NfeComponent } from './nfe.component';
import {SharedModule} from "../shared.module";
import { ProcessarComponent } from './processar/processar.component';
import { ListarNfeComponent } from './listar-nfe/listar-nfe.component';
import {NfeService} from "./nfe.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [NfeService],
  declarations: [NfeComponent, ProcessarComponent, ListarNfeComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NfeModule { }
