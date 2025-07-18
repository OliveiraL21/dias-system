import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoPorProjetoCadastroComponent } from './orcamento-por-projeto-cadastro.component';

describe('OrcamentoPorProjetoCadastroComponent', () => {
  let component: OrcamentoPorProjetoCadastroComponent;
  let fixture: ComponentFixture<OrcamentoPorProjetoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoPorProjetoCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrcamentoPorProjetoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
