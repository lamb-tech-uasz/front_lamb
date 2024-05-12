import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    telephone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  formMaker = [
    { name: 'Numéro de téléphone', key: 'telephone', type: 'text', control: this.loginForm.get('telephone') as FormControl },
    { name: 'Mot de passe', key: 'password', type: 'password', control: this.loginForm.get('password') as FormControl }
  ];

  constructor(private authService: AuthService) {

  }
  submit() {
    console.log(this.loginForm.value)
    const formData = this.loginForm.value

  }
}