import { Produto } from "../produto/Produto";

export class OrcamentoPorProjeto {
  id!: string;
  empresaId: string = "";
  clienteId: string = "";
  numero: string = "";
  valorTotal: number = 0;
  createAt?: string;
  produtos: Produto[] = [];
}
