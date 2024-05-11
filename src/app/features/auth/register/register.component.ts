import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginForm = new FormGroup({
    prenom: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  formMaker = [
    { name: 'Prénom', key: 'prenom', type: 'text', control: this.loginForm.get('prenom') as FormControl },
    { name: 'Nom', key: 'nom', type: 'text', control: this.loginForm.get('nom') as FormControl },
    { name: 'Adresse email', key: 'email', type: 'email', control: this.loginForm.get('email') as FormControl },
    { name: 'Numéro de téléphone', key: 'phone', type: 'text', control: this.loginForm.get('phone') as FormControl },
    { name: 'Mot de passe', key: 'password', type: 'password', control: this.loginForm.get('password') as FormControl },
  ];

  constructor() {

  }
  submit() {
   
  }
}