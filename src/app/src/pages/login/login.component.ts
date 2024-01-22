import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private route: Router, private activeRoute: ActivatedRoute) { }

  novoUsuario() {
    this.route.navigateByUrl('/novo-usuario');
  }

}
