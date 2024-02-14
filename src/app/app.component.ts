import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs';
import { LogoutService } from './services/logout/logout.service';
import { TokenService } from './services/token-service/token.service';
import { UsersService } from './services/user-service/user.service';
import { Usuario } from './models/usuario/usuario';
import Utils from './common/helpers/utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  value: any = "teste";
  title = 'Gereciador Tarefas Dias';
  items: MenuItem[] | undefined;
  authenticated: boolean = false;
  utils: Utils = new Utils();
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

  getUser() {
    const id = parseInt(localStorage.getItem("Id") ?? "");
    if (id) {
      this.userService.details(id).subscribe({
        next: (response: Usuario) => {
          if (response.profileImageUrl) {
            this.photo = this.utils.convertBase64ToBlob(response.profileImageUrl);
            if (this.photo) {
              this.avatarImage = true;
              this.utils.convertToBase64(this.photo).then(response => {
                this.photo = response;
              });
            }
          }
        }
      })
    }
  }

  ngOnInit() {
    this.loading = true;
    this.items = [
      {
        label: 'Minha Conta',
        icon: 'pi pi-user',
        iconClass: 'text-white',
        routerLink: 'minha-conta/'
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        iconClass: 'text-white',
        routerLink: 'cliente/'
      },
      {
        label: 'Projetos',
        icon: 'pi pi-chart-line',
        iconClass: 'text-white',
        routerLink: 'projeto/listagem'
      },
      {
        label: 'Tarefas',
        icon: 'pi pi-check-square',
        iconClass: 'text-white',
        routerLink: 'tarefas/listagem'
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        iconClass: 'text-white',
        command: () => {
          this.logout();
        }
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
