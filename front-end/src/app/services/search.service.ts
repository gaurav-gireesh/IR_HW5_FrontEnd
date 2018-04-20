import { Injectable } from '@angular/core';

import {Http,Headers} from '@angular/http';
import "rxjs/add/operator/map";


@Injectable()
export class SearchService 
{
  search_url:String = "http://localhost:3000/api/search"
  search_page_rank_url:String= "http://localhost:3000/api/search_with_pageRank";
  searchResult:any;
  constructor(private http:Http) { }

  search(keyword)
  {
    console.log("keyword = "+keyword);
    return this.http.get(this.search_url+"/"+keyword).map(data=>data.json());
  }



  search_with_pageRank(keyword)
  {
    console.log("keyword = "+keyword);
    return this.http.get(this.search_page_rank_url+"/"+keyword).map(data=>data.json());
  }
}
