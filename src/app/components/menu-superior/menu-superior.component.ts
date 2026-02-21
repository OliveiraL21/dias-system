import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notificacao } from 'src/app/models/notificacao/Notificacao';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {
  @Input() userPhoto: any;
  username: string = "";
  badgeCount: number = 0;
  intervalo: any;
  notificacoes: Notificacao[] = [];

  constructor(private route: Router) { }

  myAccount() {
    this.route.navigateByUrl('usuario/minhaConta');
  }

  ngOnInit() {

  }

}
