import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoPorHoraListagemComponent } from './orcamento-por-hora-listagem.component';

describe('OrcamentoPorHoraListagemComponent', () => {
  let component: OrcamentoPorHoraListagemComponent;
  let fixture: ComponentFixture<OrcamentoPorHoraListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoPorHoraListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoPorHoraListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
