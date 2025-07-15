import { Servico } from "../servico/Servico";

export class OrcamentoHoraCreate {
  valorHora: number = 0;
  servicos: Servico[] = [];
  empresaId: string = "";
  clienteId: string = "";
}
