import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMaker, FormOptions } from '../../interfaces/form-maker';
import { AuthService } from 'src/app/core/services/auth.service';
import { GetTokenService } from 'src/app/core/services/utils/get-token.service';
import { HttpClient } from '@angular/common/http';
import { InformationPersonelleService } from 'src/app/core/services/utils/information-personelle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuth: boolean = false;
  isLoading: boolean = false;
  erreur: boolean = false;
  error: boolean = false
  messages: string = ""

  utilisateur: any

  loginForm = new FormGroup({
    telephone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  formMaker: FormMaker[] = [
    { name: 'Numéro de téléphone', key: 'telephone', type: 'text', control: this.loginForm.get('telephone') as FormControl },
    { name: 'Mot de passe', key: 'password', type: 'password', control: this.loginForm.get('password') as FormControl }
  ];


  registerForm = new FormGroup({
    prenom: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  });

  registerFormMaker: FormMaker[] = [
    { name: 'Prénom', key: 'prenom', type: 'text', control: this.registerForm.get('prenom') as FormControl },
    { name: 'Nom', key: 'nom', type: 'text', control: this.registerForm.get('nom') as FormControl },
    { name: 'Adresse email', key: 'email', type: 'email', control: this.registerForm.get('email') as FormControl },
    { name: 'Numéro de téléphone', key: 'phone', type: 'text', control: this.registerForm.get('phone') as FormControl },
    { name: 'Mot de passe', key: 'password', type: 'password', control: this.registerForm.get('password') as FormControl },
    { name: 'Qui êtes-vous ? ', key: 'type', type: 'select', control: this.registerForm.get('type') as FormControl },
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
  constructor(private authService: AuthService, private routes: Router, private route: ActivatedRoute,
    private http: HttpClient, private servicInfo: InformationPersonelleService,
    private serveToken: GetTokenService) {
  }

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn()
  }

  submit() {
    const formData = this.loginForm.value
    this.authService.connexion(formData).then((user: any) => {
      this.isLoading = false;
      this.servicInfo.addUser(user)
      this.serveToken.addToken()
      this.servicInfo.subinfo.subscribe(data => {
        this.utilisateur = data
      })
      this.servicInfo.getInfo()

        this.routes.navigate(['/']);
    
      return;
    })
      .catch(err => {
        this.messages = "Adresse email ou mot de passe incorrect."
        this.error = true;
        this.erreur = true;
        this.isLoading = false;
      });
  }

  getOptions(ctrl: FormMaker): FormOptions[] {
    if (ctrl.type === 'select') {
      if (ctrl.key === 'type') {
        return this.type
      }
    }
    return [];
  }

  submitRegister() {
    console.log("sssss")
    const formData = this.registerForm.value
    console.log(formData)
    let data = {
      email: formData.email,
      password: formData.email,
      nom: formData.nom,
      prenom: formData.prenom,
      telephone: formData.phone,
      type: formData.type
    }
    // this.authService.register(data).subscribe(res => console.log(res))
  }
}
