import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs';
import { LogoutService } from './services/logout/logout.service';
import { TokenService } from './services/token-service/token.service';
import { UsersService } from './services/user-service/user.service';
import { Usuario } from './models/usuario/usuario';
import { Utils } from './common/helpers/utils/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  value: any = "teste";
  title = 'Gereciador Tarefas Dias';
  items: MegaMenuItem[] | undefined;
  authenticated: boolean = false;
  photo!: any;
  avatarImage: boolean = false;
  loading: boolean = false;


  constructor(private activeRoute: ActivatedRoute, private route: Router, private logoutService: LogoutService, private tokenService: TokenService, private router: Router, private userService: UsersService) { }

  logout(): void {
    this.logoutService.logoutUsuario().subscribe({
      next: (data) => {
        if (this.tokenService.possuiToken()) {
          this.tokenService.removeToken();
          localStorage.clear();
        }
        this.router.navigate(['/login']);
      }
    })
  }

  myAccount() {
    this.route.navigateByUrl('minha-conta');
  }

  getUser() {
    const id = localStorage.getItem("Id") ?? null;
    if (id) {
      this.userService.details(id).subscribe({
        next: (response: Usuario) => {
          if (response.profileImageUrl) {
            this.photo = response.profileImageUrl;
            this.avatarImage = true;
          }
        }
      })
    }
  }

  ngOnInit() {
    this.loading = true;
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        iconClass: 'text-white',
        routerLink: 'dashboard',
        root: true
      },
      {
        label: 'Minha Conta',
        icon: 'pi pi-user',
        iconClass: 'text-white',
        routerLink: 'minha-conta/',
        root: true
      },
      {
        label: 'Empresa',
        iconClass: 'text-white',
        icon: 'pi pi-building',
        routerLink: 'empresa/',
        root: true
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        iconClass: 'text-white',
        routerLink: 'cliente/',
        root: true
      },
      {
        label: 'Projetos',
        icon: 'pi pi-chart-line',
        iconClass: 'text-white',
        routerLink: 'projeto/listagem',
        root: true
      },
      {
        label: 'Tarefas',
        icon: 'pi pi-check-square',
        iconClass: 'text-white',
        routerLink: 'tarefas/listagem',
        root: true
      },
      {
        label: 'Orçamentos',
        icon: 'pi pi-money-bill',
        iconClass: 'text-white',
        root: true,
        items: [
          [{
            label: 'Por Serviço',
            items: [{
              label: 'orçamento por Serviço',
              icon: 'pi pi-clock',
              routerLink: 'orcamentoPorHora/',
              root: false,
            },
            ]
          }],
          [{
            label: 'Por Projeto',
            items: [{
              label: 'orçamento por projeto',
              icon: 'pi pi-folder',
              routerLink: 'orcamentoPorProjeto/',
              root: false,
            },
            {
              label: 'Produtos',
              icon: 'pi pi-box',
              routerLink: 'produto/',
              root: false,
            }
            ]
          }]
        ]
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        iconClass: 'text-white',
        command: () => {
          this.logout();
        },
        root: true
      }
    ];

    if (this.authenticated) {
      this.getUser();
    }

    this.route.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(({ url }: any) => {
      const appUrl = url.split('/')[1];
      switch (appUrl) {
        case '/':
          this.authenticated = false;
          break;
        case 'login':
          this.authenticated = false;
          break;

        case 'novo-usuario':
          this.authenticated = false;
          break;

        case 'redefinirSenha':
          this.authenticated = false;
          break;


        case 'esqueceu-senha':
          this.authenticated = false;
          break;

        case '':
          this.authenticated = false;
          break;


        default:
          this.authenticated = true;
          this.getUser();

      }
    });
    this.loading = false;
  }
}
