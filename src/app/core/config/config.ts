import { AbstractControl } from '@angular/forms';
import { environment } from './../../../environments/environment';
export const config = {
    apiUrl: environment.apiUrl,
};
export const headers = {
    'Accept': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem('807605274673228623802113__plateforme-bull-yakk-token') || '',
};

export const getToken = () => {
    if (localStorage.getItem('807605274673228623802113__plateforme-bull-yakk-token') !== null) {
        return true
    }
    return false
}

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : localStorage.clear();
};
