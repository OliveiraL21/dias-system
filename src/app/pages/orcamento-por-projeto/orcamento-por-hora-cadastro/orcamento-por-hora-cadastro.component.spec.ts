import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoPorHoraCadastroComponent } from './orcamento-por-hora-cadastro.component';

describe('OrcamentoPorHoraCadastroComponent', () => {
  let component: OrcamentoPorHoraCadastroComponent;
  let fixture: ComponentFixture<OrcamentoPorHoraCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoPorHoraCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoPorHoraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
