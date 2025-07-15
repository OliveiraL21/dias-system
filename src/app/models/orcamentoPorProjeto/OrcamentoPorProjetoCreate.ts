import { Produto } from "../produto/Produto";

export class OrcamentoPorProjetoCreate {
  empresaId: string = "";
  clienteId: string = "";
  produtos: Produto[] = [];
}
