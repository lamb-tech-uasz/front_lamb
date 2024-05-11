import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  formMaker = [
    { name: 'Numéro de téléphone', key: 'phone', type: 'text', control: this.loginForm.get('phone') as FormControl },
    { name: 'Mot de passe', key: 'password', type: 'password', control: this.loginForm.get('password') as FormControl }
  ];

  constructor() {

  }
  submit() {
   
  }
}