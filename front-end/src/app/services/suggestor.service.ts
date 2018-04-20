import { Injectable } from '@angular/core';

import {Http,Headers} from '@angular/http';
import "rxjs/add/operator/map";


@Injectable()
export class SuggestorService 
{
  suggest_url:String = "http://localhost:3000/api/suggest";
 
  suggestResult:any;

  constructor(private http:Http) { }

  suggest(keyword)
  {
      return this.http.get(this.suggest_url+"/"+keyword).map(data=>data.json());
  }



}
