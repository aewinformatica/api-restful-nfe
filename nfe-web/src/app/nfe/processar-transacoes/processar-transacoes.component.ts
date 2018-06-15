import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {UiToolbarService} from "ng-smn-ui";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NfeService} from "../nfe.service";

@Component({
  selector: 'app-processar-transacoes',
  templateUrl: './processar-transacoes.component.html',
  styleUrls: ['./processar-transacoes.component.scss']
})
export class ProcessarTransacoesComponent implements OnInit, OnDestroy, AfterViewInit {
  fileNfeTran: any;
  loading: boolean;
  chaves: any;

  constructor(private titleService: Title,
              private toolbarService: UiToolbarService,
              private http: HttpClient,
              private router: Router,
              private nfeService: NfeService) {

  }

  ngOnInit() {
    this.titleService.setTitle('Processamento de arquivos NF-e');
    this.toolbarService.set('Upload');
  }

  ngAfterViewInit() {
    this.toolbarService.activateExtendedToolbar(840);
  }

  ngOnDestroy() {
    this.toolbarService.deactivateExtendedToolbar();
  }

  readNfeTran(file, item, index) {
    this.fileNfeTran = item.replace('data:text/plain;base64,', '');
  }

  changeFile(listFile: FileList, invalid) {
    // console.log(listFile, invalid);
  }

  error(file, errors, index) {
    console.log(file, errors, index)
  }

  upload(input) {
    input.click();
  }

  request() {
    this.loading = true;

    this.http.post('http://localhost:2000/nfe/transacao',
      {
        "file": this.fileNfeTran
      })
      .subscribe((res) => {
        this.chaves = res.content
      }, err => {
        console.log(err);
        this.loading = false;
      }, () => {
        this.loading = false;
      })
  }
}
