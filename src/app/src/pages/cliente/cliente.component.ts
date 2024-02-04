import { Component } from '@angular/core';
import Cliente from '../../models/cliente/cliente';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente-service/cliente.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [MessageService]
})
export class ClienteComponent {
  clients: Cliente[] = [];
  form!: FormGroup;
  loading: boolean = false

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private messageService: MessageService) { }

  ngOnInit() {
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listarTodos().subscribe({
      next: (response: Cliente[]) => {
        this.clients = response;
      }
    })
  }
}
