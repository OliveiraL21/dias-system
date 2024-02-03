import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    loadChildren: () => import('./src/pages/login/login.module').then((m) => m.LoginModule)
  },

  {
    path: 'novo-usuario',
    loadChildren: () => import('./src/pages/novo-usuario/novo-usuario.module').then((m) => m.NovoUsuarioModule)
  },
  {
    path: 'esqueceu-senha',
    loadChildren: () => import("./src/pages/esqueceu-senha/esqueceu-senha.module").then((m) => m.EsqueceuSenhaModule),
  },

  {
    path: 'redefinirSenha',
    loadChildren: () => import("./src/pages/redefinir-senha/redefinir-senha.module").then((m) => m.RedefinirSenhaModule),
  },

  { path: 'cliente', loadChildren: () => import('./src/pages/cliente/cliente.module').then((m) => m.ClienteModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
