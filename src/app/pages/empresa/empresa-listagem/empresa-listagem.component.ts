import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import { Empresa } from 'src/app/models/empresa/Empresa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-empresa-listagem',
  templateUrl: './empresa-listagem.component.html',
  styleUrl: './empresa-listagem.component.css',
  providers: [ConfirmationService],
})
export class EmpresaListagemComponent {
  loading: boolean = false;
  formGroup!: FormGroup;
  empresas: Empresa[] = [];

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private service: EmpresaService, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      razaoSocial: [null, null],
      cpf: [null, null],
    })
  }

  getCustomFilter(): CustomFilter[] {
    return [
      new CustomFilter('razaoSocial', 'text', 'Razão Social', 'Razão Social', '', [], '', '', true),
      new CustomFilter('cpf', 'text', '000.000.000-00', 'Cpf', '000.000.000-00', [], '', '', true)
    ];
  }

  getEmpresas() {
    this.loading = true;
    this.service.list().subscribe({
      next: (response: Empresa[]) => {
        this.empresas = response;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  editar(id: string) {
    this.router.navigateByUrl(`empresa/editar/${id}`);
  }

  deletar(event: any, id: string) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esta empresa?',
      accept: () => {
        this.service.delete(id).subscribe({
          next: () => {
            this.getEmpresas();
          },
          error: (error) => {
            console.error('Erro ao excluir empresa:', error);
          }
        });
      }
    });
  }

  novo() {

  }

  ngOnInit() {
    this.initForm();
    this.getEmpresas();
  }

  filtrar(filtros: any) {

  }
}
