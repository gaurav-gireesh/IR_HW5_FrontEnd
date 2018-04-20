import { Injectable } from '@angular/core';


import {Http,Headers} from '@angular/http';
import "rxjs/add/operator/map";
// import "rxjs/add/operator/flatMap"
@Injectable()
export class SpellCheckerService {

  spell_check_url   =   "http://localhost:3000/api/spell"
  constructor(private http : Http) { }


  spell(keyword)
  {
    console.log("keyword = "+keyword);
    return this.http.get(this.spell_check_url+"/"+keyword).map(data=>data.json());
  }

}
