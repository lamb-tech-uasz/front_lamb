import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormMaker, FormOptions } from 'src/app/shared/interfaces/form-maker';

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
    password: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  });

  formMaker: FormMaker[] = [
    { name: 'Prénom', key: 'prenom', type: 'text', control: this.loginForm.get('prenom') as FormControl },
    { name: 'Nom', key: 'nom', type: 'text', control: this.loginForm.get('nom') as FormControl },
    { name: 'Adresse email', key: 'email', type: 'email', control: this.loginForm.get('email') as FormControl },
    { name: 'Numéro de téléphone', key: 'phone', type: 'text', control: this.loginForm.get('phone') as FormControl },
    { name: 'Mot de passe', key: 'password', type: 'password', control: this.loginForm.get('password') as FormControl },
    { name: 'Qui êtes-vous ? ', key: 'type', type: 'select', control: this.loginForm.get('type') as FormControl },
  ];

  type: FormOptions[] = [
    {
      name: 'Particulier',
      value: 'particulier'
    },
    {
      name: 'Société',
      value: 'societe'
    }
  ]
  constructor(private authService: AuthService) { }

  getOptions(ctrl: FormMaker): FormOptions[] {
    if (ctrl.type === 'select') {
      if (ctrl.key === 'type') {
        return this.type
      }
    }
    return [];
  }

  submit() {
    console.log("sssss")
    const formData = this.loginForm.value
    console.log(formData)
    let data = {
      email: formData.email,
      password: formData.email,
      nom: formData.nom,
      prenom: formData.prenom,
      telephone: formData.phone,
      type: formData.type
    }
    // this.authService.(data).subscribe(res => console.log(res))
  }
}