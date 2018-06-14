import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarNfeComponent } from './listar-nfe.component';

describe('ListarNfeComponent', () => {
  let component: ListarNfeComponent;
  let fixture: ComponentFixture<ListarNfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarNfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarNfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
