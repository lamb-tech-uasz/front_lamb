import { FormControl } from "@angular/forms";

export interface FormMaker {
    name: string, 
    key: string,
    type: 'text' | 'select' | 'calendar' | 'img' | 'number' | 'textarea' | 'email' | 'password',  
    control: FormControl
  }
  
  
export interface FormOptions {
    name: string,
    value: string | number | boolean,
  }