import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessarTransacoesComponent } from './processar-transacoes.component';

describe('ProcessarTransacoesComponent', () => {
  let component: ProcessarTransacoesComponent;
  let fixture: ComponentFixture<ProcessarTransacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessarTransacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessarTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
