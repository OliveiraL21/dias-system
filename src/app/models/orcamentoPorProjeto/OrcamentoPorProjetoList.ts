import Cliente from "../cliente/cliente";
import { Empresa } from "../empresa/Empresa";
import { Produto } from "../produto/Produto";

export class OrcamentoPorProjetoList {
  id!: string;
  empresa!: Empresa;
  cliente!: Cliente;
  numero: string = "";
  valorTotal: number = 0;
  createAt?: string;
  produtos: Produto[] = [];
}
