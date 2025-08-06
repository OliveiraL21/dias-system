import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomFormControls } from 'src/app/models/custonsModels/CustomFormData/CustomFormControls';
import CustomInputNumberData from 'src/app/models/custonsModels/customInputNumberData/CustomInputNumberData';
import { CustomInputText } from 'src/app/models/custonsModels/CustomTextInputData/CustomInputText';
import { Produto } from 'src/app/models/produto/Produto';
import { ProdutoCreate } from 'src/app/models/produto/ProdutoCreate';
import { ProdutoUpdate } from 'src/app/models/produto/ProdutoUpdate';
import { MensagemService } from 'src/app/services/message/Mensagem.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css'
})
export class ProdutoCadastroComponent {
  loading: boolean = false;
  form!: FormGroup;
  title: string = "Cadastro de produtos";
  id: string = this.activatedRouter.snapshot.paramMap.get('id') ?? '';

  constructor(private fb: FormBuilder, private router: Router, private activatedRouter: ActivatedRoute, private service: ProdutoService, private menssageService: MensagemService) { }

  getCustomControls(): CustomFormControls[] {
    return [
      {
        type: 'text',
        data: new CustomInputText('descricao', 'Descrição', 'descricao', 'Descrição', 'descricao', false, true, '')
      },
      {
        type: 'number',
        data: new CustomInputNumberData('valor', 'Valor Unitário', 'valor', 'currency', true)
      }
    ]
  }

  initForm() {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      valor: [null, [Validators.required]]
    })
  }

  getProduto() {
    this.loading = true;
    this.service.details(this.id).subscribe({
      next: (response: Produto) => {
        Object.keys(this.form.controls)?.forEach((key: string) => {
          this.form.get(key)?.setValue(response[key as keyof Produto]);
        });
        this.loading = false;
      }, error: (erro: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  create(data: any) {
    let produto: ProdutoCreate = data;
    this.service.create(produto).subscribe({
      next: (produto: ProdutoCreate) => {
        this.loading = false;
        this.menssageService.sucesso('Produto', 'Produto cadastrado com sucesso!');
        this.router.navigateByUrl('produto');
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }

  update(data: any) {
    let produto: ProdutoUpdate = data;
    produto.id = this.id;
    this.service.update(this.id, produto).subscribe({
      next: (produto: ProdutoUpdate) => {
        this.loading = false;
        this.menssageService.sucesso('Produto', 'Produto atualizado com sucesso!');
        this.router.navigateByUrl('produto');
      }, error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }
  cancel() {
    this.router.navigateByUrl('produto')
  }
  save(data: any) {
    this.loading = true;
    if (this.id) {
      this.update(data);
    } else {
      this.create(data);
    }
  }
  ngOnInit() {
    this.initForm();
    if (this.id) {
      this.title = "Editar Produto";
      this.getProduto();
    }
  }

}
