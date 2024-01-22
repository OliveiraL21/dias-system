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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
