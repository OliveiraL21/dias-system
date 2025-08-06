import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoPorProjetoListagemComponent } from './orcamento-por-projeto-listagem.component';

describe('OrcamentoPorProjetoListagemComponent', () => {
  let component: OrcamentoPorProjetoListagemComponent;
  let fixture: ComponentFixture<OrcamentoPorProjetoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoPorProjetoListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoPorProjetoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
