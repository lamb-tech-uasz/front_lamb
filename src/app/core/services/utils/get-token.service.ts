import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getToken } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  subToken = new Subject<any>()
  token!: boolean

  constructor() { }

  emit() {
    this.subToken.next(this.token)
  }

  getTken() {
    this.token = getToken()
    this.emit()
  }

  addToken() {
    this.getTken()
  }
}