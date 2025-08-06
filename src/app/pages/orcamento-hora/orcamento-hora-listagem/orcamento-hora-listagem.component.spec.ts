import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoHoraListagemComponent } from './orcamento-hora-listagem.component';

describe('OrcamentoHoraListagemComponent', () => {
  let component: OrcamentoHoraListagemComponent;
  let fixture: ComponentFixture<OrcamentoHoraListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoHoraListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoHoraListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
