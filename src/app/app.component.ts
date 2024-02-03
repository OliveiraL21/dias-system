import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs';

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

  constructor(private activeRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-user',
        iconClass: 'text-white'
      },
      {
        label: 'Projetos',
        icon: 'pi pi-chart-line',
        iconClass: 'text-white'
      },
      {
        label: 'Tarefas',
        icon: 'pi pi-check-square',
        iconClass: 'text-white'
      }
    ];

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

      }
    })

    console.log(this.authenticated);
  }
}
