import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsideTogglerService {
  toggler:boolean = false;
  setTogelerValue(value:boolean){
    this.toggler = value;
  }
  getTogelerValue(){
    console.log("toggler value : ", this.toggler);
    return this.toggler;
  }
}