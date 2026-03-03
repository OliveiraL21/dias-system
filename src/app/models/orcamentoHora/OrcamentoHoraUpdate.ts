import { Servico } from "../servico/Servico";

export class OrcamentoHoraUpdate {
  id!: string;
  numero: string = "";
  desconto: number = 0;
  valorTotal: number = 0;
  valorTotalDesconto: number = 0;
  valorHora: number = 0;
  observacao: string = "";
  servicos: Servico[] = [];
  empresaId: string = "";
  clienteId: string = "";
  createAt!: Date;
  tempoDeEntrega!: string;
}
