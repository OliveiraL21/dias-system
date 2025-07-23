import { Produto } from "../produto/Produto";

export class OrcamentoPorProjetoUpdate {
  id?: string;
  empresaId: string = "";
  clienteId: string = "";
  numero: string = "";
  valorTotal: number = 0;
  createAt?: Date;
  produtos: Produto[] = [];
}
