import { Servico } from "../servico/Servico";

export class OrcamentoHoraUpdate {
  id!: string;
  numero: string = "";
  valorTotal: number = 0;
  valorHora: number = 0;
  servicos: Servico[] = [];
  empresaId: string = "";
  clienteId: string = "";
  createAt!: Date;
  tempoDeEntrega!: string;
}
