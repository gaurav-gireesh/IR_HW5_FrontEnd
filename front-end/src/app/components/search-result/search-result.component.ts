import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import {SearchService} from '../../services/search.service';
@Component
({
      selector: 'app-search-result',
      templateUrl: './search-result.component.html',
      styleUrls: ['./search-result.component.css']

})
export class SearchResultComponent implements OnInit {


  result:any;
  keyword:String;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private searchService: SearchService) {


    // this.keyword = this.activatedRoute.snapshot.params['keyword'];
    // console.log("Came here..");
   }

  ngOnInit() {
    this.keyword = this.activatedRoute.snapshot.params['keyword'];
    console.log("Came here..in init");
    this.router.events
    .subscribe((event) => {
      console.log("Event fired");
    
      this.keyword = this.activatedRoute.snapshot.params['keyword'];

      //calling the search service here...
      this.searchService.search(this.keyword).subscribe(data=>{this.result=data;
        console.log(this.result['response']['docs'].length);
      });
      
      
     
      

     
    });
    }
  

}
