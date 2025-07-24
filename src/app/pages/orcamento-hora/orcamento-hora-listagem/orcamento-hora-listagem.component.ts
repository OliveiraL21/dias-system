import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import Cliente from 'src/app/models/cliente/cliente';
import { CustomFilter } from 'src/app/models/customFilter/customFilter';
import { CustomButton } from 'src/app/models/custonsModels/CustomButtonData/CustomButton';
import { CustomFormControls } from 'src/app/models/custonsModels/CustomFormData/CustomFormControls';
import Column from 'src/app/models/custonsModels/CustomTable/CustomColumn';
import { OrcamentoHora } from 'src/app/models/orcamentoHora/OrcamentoHora';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { OrcamentoHoraService } from 'src/app/services/orcamentoHora/orcamento-hora.service';

@Component({
  selector: 'app-orcamento-hora-listagem',
  templateUrl: './orcamento-hora-listagem.component.html',
  styleUrl: './orcamento-hora-listagem.component.css',
  providers: [ConfirmationService]
})
export class OrcamentoHoraListagemComponent {
  loading: boolean = false;
  form!: FormGroup;
  clientes: Cliente[] = [];
  orcamentos: OrcamentoHora[] = [];

  constructor(private fb: FormBuilder, private service: OrcamentoHoraService, private messageService: MensagemService, private router: Router, private clienteService: ClienteService) { }

  initForm() {
    this.form = this.fb.group({
      numero: [null, null],
      cliente: [null, null]
    });
  }

  getOrcamentos() {
    this.service.list().subscribe({
      next: (response: OrcamentoHora[]) => {
        this.orcamentos = response;
        this.loading = false;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  getClientes() {
    this.clienteService.listaSimples().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  getCustomFilters(): CustomFilter[] {
    return [
      new CustomFilter('numero', 'text', 'Informe o número do orçamento', 'Número', '', [], '', '', true),
      new CustomFilter('cliente', 'dropdown', 'Selecione o cliente', 'Cliente', '', this.clientes, 'id', 'razaoSocial', true)
    ]
  }

  getCustomColumns(): Column[] {
    return [
      new Column('numero', 'Número', false),
      new Column('empresa$razaoSocial', 'Empresa'),
      new Column('cliente$razaoSocial', 'Cliente'),
      new Column('createAt', 'Data'),
      new Column('valorTotal', 'Valor')
    ]
  }

  getCustomButton(label: string, style: string, severity: string, icon: string, tooltip: string): CustomButton {
    return new CustomButton(label, true, style, severity, icon, tooltip);
  }

  filtrar(data: any) {
    console.log(data);
  }

  novo(data: any) {
    this.router.navigateByUrl('orcamentoPorHora/cadastro');
  }

  ngOnInit() {
    this.initForm();
    this.getClientes();
    this.getOrcamentos();
  }
}
