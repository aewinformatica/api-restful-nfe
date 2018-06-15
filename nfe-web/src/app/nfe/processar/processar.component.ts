import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {UiToolbarService} from "ng-smn-ui";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NfeService} from "../nfe.service";

@Component({
  selector: 'app-processar',
  templateUrl: './processar.component.html',
  styleUrls: ['./processar.component.scss']
})
export class ProcessarComponent implements OnInit, OnDestroy, AfterViewInit {
  fileNfe: any;
  fileNfeTran: any;
  chave: any;
  periodo: any;
  tipoDoc: any;
  docDestinatario: any;
  chips;
  selectedChips;
  loading: boolean;

  constructor(private titleService: Title,
              private element: ElementRef,
              private toolbarService: UiToolbarService,
              private http: HttpClient,
              private router: Router,
              private nfeService: NfeService) {
    this.chips = [];
    this.selectedChips = [];
  }

  loadChips() {
    const chips = [
      'AUTORIZADO',
      'DENEGADO',
      'REJEITADO',
      'CANCELADO'
    ];

    this.selectedChips.forEach(selectedChip => {
      chips.forEach((chip, i) => {
        if (chip === selectedChip) {
          chips.splice(i, 1);
        }
      });
    });

    this.chips = chips;
  }

  chipSelect(chip) {
    this.selectedChips.push(chip);
    setTimeout(() => {
      delete this.chips.searchState;
    });
  }

  removeChip(chip) {
    this.selectedChips.splice(this.selectedChips.indexOf(chip), 1);
  }

  ngOnInit() {
    this.titleService.setTitle('Processamento de arquivos NF-e');
    this.toolbarService.set('Upload');

    this.loadChips();
  }

  ngAfterViewInit() {
    this.toolbarService.activateExtendedToolbar(840);
  }

  ngOnDestroy() {
    this.toolbarService.deactivateExtendedToolbar();
  }

  readNfe(file, item, index) {
    this.fileNfe = item.replace('data:text/plain;base64,', '');
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

    this.http.post('http://localhost:2000/nfe',
      {
        "file": this.fileNfe,
        "periodo": this.periodo ? this.periodo.toLocaleDateString('pt-BR') : null,
        "tipoDocumento": this.tipoDoc,
        "chave": this.chave,
        "documentoDestinatario": this.docDestinatario,
        "fileTran": this.fileNfeTran,
        "status": this.selectedChips
      })
      .subscribe((res) => {
        this.nfeService.itens = res;
        this.router.navigate(['/nfe/listagem']);
      }, err => {
        console.log(err);
        this.loading = false;
      }, () => {
        this.loading = false;
      })
  }

}
