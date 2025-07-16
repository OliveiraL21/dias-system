import { Status } from "../status/status";

export class Empresa {
  id!: string;
  razaoSocial: string = "";
  cpf: string = "";
  telefone: string = "";
  celular: string = "";
  email: string = "";
  logradouro: string = "";
  numero: string = "";
  bairro: string = "";
  cidade: string = "";
  estado: string = "";
  cep: string = "";
  status!: Status;
}
