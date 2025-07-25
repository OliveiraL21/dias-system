import Cliente from "../cliente/cliente";
import { Empresa } from "../empresa/Empresa";
import { Servico } from "../servico/Servico";

export class OrcamentoHora {
  id!: string;
  numero: string = "";
  valorTotal: number = 0;
  valorHora: number = 0;
  servicos: Servico[] = [];
  cliente?: Cliente;
  empresa?: Empresa;
  createAt!: string;
}
