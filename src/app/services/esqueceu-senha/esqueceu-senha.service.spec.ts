/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EsqueceuSenhaService } from './esqueceu-senha.service';

describe('Service: EsqueceuSenha', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsqueceuSenhaService]
    });
  });

  it('should ...', inject([EsqueceuSenhaService], (service: EsqueceuSenhaService) => {
    expect(service).toBeTruthy();
  }));
});
