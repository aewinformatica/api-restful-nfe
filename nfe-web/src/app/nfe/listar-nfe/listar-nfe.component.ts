import {ChangeDetectorRef, Component, ElementRef, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {UiToolbarService} from "ng-smn-ui";
import {Title} from "@angular/platform-browser";
import {NfeService} from "../nfe.service";

@Component({
  selector: 'app-listar-nfe',
  templateUrl: './listar-nfe.component.html',
  styleUrls: ['./listar-nfe.component.scss']
})
export class ListarNfeComponent implements OnInit, OnDestroy, AfterViewInit {
  lista: any[] = [];
  detalhes: any[];

  constructor(private titleService: Title,
              private element: ElementRef,
              private toolbarService: UiToolbarService,
              private changeDetectorRef: ChangeDetectorRef,
              private nfeService: NfeService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Hashing com lista encadeada');
    this.toolbarService.set('Listagem');
  }

  ngAfterViewInit() {
    this.toolbarService.activateExtendedToolbar(840);
    this.load();
  }

  ngOnDestroy() {
    this.toolbarService.deactivateExtendedToolbar();
  }

  load() {
    this.lista = this.nfeService.itens ? this.nfeService.itens.content : [];
    this.changeDetectorRef.detectChanges();
  }

  show(item) {
    this.detalhes = item.transacoes;
  }
}
