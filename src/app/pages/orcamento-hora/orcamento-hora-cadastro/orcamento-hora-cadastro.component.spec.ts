import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoHoraCadastroComponent } from './orcamento-hora-cadastro.component';

describe('OrcamentoHoraCadastroComponent', () => {
  let component: OrcamentoHoraCadastroComponent;
  let fixture: ComponentFixture<OrcamentoHoraCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoHoraCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoHoraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
