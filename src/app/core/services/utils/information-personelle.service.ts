import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GetTokenService } from './get-token.service';
import { AuthService } from '../auth.service';
import { getUser } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class InformationPersonelleService {

  utilisateur: any
  societe: any
  subinfo = new Subject<any>()
  socinfo = new Subject<any>()
  constructor(private servitoken: GetTokenService, private authService: AuthService) { }

  emit() {
    this.subinfo.next(this.utilisateur)
    this.socinfo.next(this.societe)
  }

  getInfo() {
    this.utilisateur = getUser()
    this.emit()
  }


  async addUser(user: any) {
    const { token, userConnect } = user;

    const { prenom, nom, email, telephone, type,authorities } = userConnect;


    const utilisateur = {
      nom: `${nom}`,
      prenom,
      name: nom,
      email,
      telephone,
      type,

    };


    localStorage.setItem('807605274673228623802113__plateforme-bull-yakk-token', token);
    localStorage.setItem('user', JSON.stringify(utilisateur));
    this.getInfo();
  }

}
