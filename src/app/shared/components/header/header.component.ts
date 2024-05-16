import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PanierService } from "src/app/core/panier.service";
import { AuthService } from "src/app/core/services/auth.service";
import { GetTokenService } from "src/app/core/services/utils/get-token.service";
import { InformationPersonelleService } from "src/app/core/services/utils/information-personelle.service";
import { FormMaker, FormOptions } from "../../interfaces/form-maker";
import { phoneNumberValidator } from "../../validators/phone";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  userLocation: any;

  isAuth: boolean = false;
  isLoading: boolean = false;
  erreur: boolean = false;
  error: boolean = false;
  success: boolean = false;
  messages: string = "";

  utilisateur: any;

  loginForm = new FormGroup({
    telephone: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  formMaker: FormMaker[] = [
    {
      name: "Numéro de téléphone",
      key: "telephone",
      type: "text",
      control: this.loginForm.get("telephone") as FormControl,
    },
    {
      name: "Mot de passe",
      key: "password",
      type: "password",
      control: this.loginForm.get("password") as FormControl,
    },
  ];

  registerForm = new FormGroup({
    prenom: new FormControl("", [Validators.required]),
    nom: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email]),
    phone: new FormControl("", [
      Validators.required,
      phoneNumberValidator(/(77|78|75|70|76)[0-9]{7}$/),
    ]),
    password: new FormControl("", [Validators.required]),
    confirmer: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
  });

  registerFormMaker = [
    {
      name: "Prénom",
      key: "prenom",
      type: "text",
      control: this.registerForm.get("prenom") as FormControl,
    },
    {
      name: "Nom",
      key: "nom",
      type: "text",
      control: this.registerForm.get("nom") as FormControl,
    },
    {
      name: "Adresse email",
      key: "email",
      type: "email",
      control: this.registerForm.get("email") as FormControl,
    },
    {
      name: "Numéro de téléphone",
      key: "phone",
      type: "text",
      control: this.registerForm.get("phone") as FormControl,
    },
    {
      name: "Mot de passe",
      key: "password",
      type: "password",
      control: this.registerForm.get("password") as FormControl,
    },
    {
      name: "Confirmer mot de passe",
      key: "confirmer",
      type: "password",
      control: this.registerForm.get("confirmer") as FormControl,
    },
    {
      name: "Qui êtes-vous ? ",
      key: "type",
      type: "select",
      control: this.registerForm.get("type") as FormControl,
    },
  ];

  type: FormOptions[] = [
    {
      name: "Particulier",
      value: "particulier",
    },
    {
      name: "Société",
      value: "societe",
    },
  ];
  constructor(
    private authService: AuthService,
    private routes: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private servicInfo: InformationPersonelleService,
    private serveToken: GetTokenService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn();
  }

  submit() {
    const formData = this.loginForm.value;
    this.authService
      .connexion(formData)
      .then((user: any) => {
        this.isLoading = false;
        this.servicInfo.addUser(user);
        this.serveToken.addToken();
        this.servicInfo.subinfo.subscribe((data) => {
          this.utilisateur = data;
        });
        this.servicInfo.getInfo();
        document.getElementById("fermer")!.click();
        window.location.reload();
        return;
      })
      .catch((err) => {
        this.messages = "Adresse email ou mot de passe incorrect.";
        this.error = true;
        this.erreur = true;
        this.isLoading = false;
      });
  }

  getOptions(ctrl: any): FormOptions[] {
    if (ctrl.type === "select") {
      if (ctrl.key === "type") {
        return this.type;
      }
    }
    return [];
  }

  submitRegister() {
    this.error = false;
    this.messages = "";
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      if (formData.password !== formData.confirmer) {
        this.error = true;
        this.messages =
          "Mot de passe de confirmation est differente de la première.";
        return;
      }
      let data = {
        email: formData.email,
        password: formData.password,
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.phone,
        type: formData.type,
      };

      this.getUserLocation()
        .then((userLocation) => {
          data = { ...data, ...userLocation };
          console.log(data);
          this.authService.register(data).subscribe((res: any) => {
            if (res.error) {
              this.error = true;
              this.messages = res.message;
            } else {
              this.success = true;
              this.messages =
                res.message + " .Vous pouvez vous connecter maintenant.";
            }
          });
        })
        .catch((error) => {
          console.log(
            "Erreur lors de la récupération de la localisation :",
            error
          );
          this.authService.register(data).subscribe((res) => console.log(res));
        });
    }
  }

  getUserLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            resolve(userLocation);
          },
          (error) => {
            console.log(
              "Erreur lors de la récupération de la localisation :",
              error
            );
            reject(error);
          }
        );
      } else {
        alert("Activer votre geolocalisation.");
      }
    });
  }

  seDeconnecter() {
    this.authService.deconnexion();
  }

  getNombreArticlePanier() {
    return this.panierService.getNombreArtcle();
  }
}
