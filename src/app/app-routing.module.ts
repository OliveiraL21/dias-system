import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
  { path: 'novo-usuario', loadChildren: () => import('./pages/novo-usuario/novo-usuario.module').then((m) => m.NovoUsuarioModule) },
  { path: 'esqueceu-senha', loadChildren: () => import("./pages/esqueceu-senha/esqueceu-senha.module").then((m) => m.EsqueceuSenhaModule) },
  { path: 'redefinirSenha', loadChildren: () => import("./pages/redefinir-senha/redefinir-senha.module").then((m) => m.RedefinirSenhaModule) },
  { path: 'cliente', loadChildren: () => import('./pages/cliente/cliente.module').then((m) => m.ClienteModule) },
  { path: 'projeto', loadChildren: () => import('./pages/projeto/projeto.module').then((m) => m.ProjetoModule) },
  { path: 'tarefas', loadChildren: () => import('./pages/tarefas/tarefas.module').then((m) => m.TarefasModule) },
  { path: 'minha-conta', loadChildren: () => import('./pages/minha-conta/minha-conta.module').then((m) => m.MinhaContaModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
