import { ProdutoOrcamentoCreate } from "../produtoOrcamento/ProdutoOrcamentoCreate";

export class OrcamentoPorProjetoCreate {
  empresaId: string = "";
  clienteId: string = "";
  produtos: ProdutoOrcamentoCreate[] = [];
  tempoDeEntrega!: string;
}
