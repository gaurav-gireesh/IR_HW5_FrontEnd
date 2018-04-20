import { Component, OnInit, OnChanges } from '@angular/core';
import {FlashMessagesService} from  'angular2-flash-messages';
import {Router} from '@angular/router';

import {SearchService} from '../../services/search.service';
import { SuggestorService } from '../../services/suggestor.service';

import {SpellCheckerService} from '../../services/spell-checker.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

        keyword:String;
        keywordStatic:String;
        result:any;
        suggestResult:any;
        pageRank:boolean=true;

        correctedKeywords="";
        constructor(private flash:FlashMessagesService,private router:Router,private searchService:SearchService,
          private suggestorService:SuggestorService,
          private spellingService:SpellCheckerService
        ) { 
          
          }

  ngOnInit() {
       
  }

  


  process()
  {
    
    let checkEleme =document.getElementById('keywordautocomplete-list');
    if(checkEleme!=null || checkEleme!=undefined)
    {
      checkEleme.parentNode.removeChild(checkEleme);
    }

  
    
    if(this.keyword==undefined || this.keyword.length==0)
    {
        this.result=null;
        this.flash.show("Please enter a Keyword!!",{cssClass:'alert-danger',timeout:2000});
        return false;
    }

    else{
      this.keywordStatic=this.keyword;
        
       

          if(!this.pageRank)
          {

              let numWords = this.keyword.split(" ").length;

              if(numWords == 1 ){

               
                this.spellingService.spell(this.keyword).subscribe(correct=>{

                 
                  if(this.keyword.trim()==correct.correct.trim())
                    this.correctedKeywords=null;
                  else
                    this.correctedKeywords = correct.correct.trim();

                    console.log("Then corrected keyword is");

                  this.searchService.search(correct.correct).subscribe(data=>{
                    //this.correctedKeywords=correct.correct;
                    this.result=data;
                              if(this.result['response']['docs'].length==0)
                              {
                                this.flash.show("No result found!",{cssClass:'alert-warning',timeout:5000});
                                            return false;
                              }
                      
                                          },
      
                                  err => {
                                            this.flash.show("Oops.. SORRY! Our Backend Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info table-success',timeout:5000});
                                            return false;
                                      }
                    
                    
                                                            );
            

            }
          
        );
              
                                    
                                    
                                    
                                    
                                    
                    }
              else{
                         let keywords = this.keyword.split(" ");
                         let corrected ="";
                         var itemsProcessed =0;
                        
                          keywords.forEach(
                            (item) => {
                                        itemsProcessed++;
                                  //console.log("Item is "+item+"###");
                                      if(!(item===" " || item==="")){
                                      this.spellingService.spell(item).subscribe(data=>{
                                    corrected+=" "+(data.correct);
                                    if(itemsProcessed==numWords) {cb(corrected);}
                              

                              }
                            
                          ); }
                          
              });
              
              
              
              
              var cb =(c:String)  =>
                                      {
                                          
                                          if(c.trim()===this.keyword.trim()){this.correctedKeywords=null;}
                                          else{
                                            this.correctedKeywords=c.trim();
                                          }
                                          
                                          this.searchService.search(c).subscribe(data=>{
                                          this.result=data;
                                                    if(this.result['response']['docs'].length==0)
                                                    {
                                                      this.flash.show("No result found!",{cssClass:'alert-warning',timeout:5000});
                                                                  return false;
                                                    }
                                            
                                                                },
                            
                                                        err => {
                                                                  this.flash.show("Oops.. SORRY! Our Backend Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info table-success',timeout:5000});
                                                                  return false;
                                                            }
                                          
                                          
                                                                                  );
                                      
                                      
                                      
                                      
                                      };
              

          
        }
      
      }


      else{
        let numWords = this.keyword.split(" ").length;

        if(numWords == 1 ){

               
          this.spellingService.spell(this.keyword).subscribe(correct=>{

           
            if(this.keyword.trim()==correct.correct.trim())
              this.correctedKeywords=null;
            else
              this.correctedKeywords = correct.correct.trim();

              //console.log("Then corrected keyword is");

            this.searchService.search_with_pageRank(correct.correct).subscribe(data=>{
              //this.correctedKeywords=correct.correct;
              this.result=data;
                        if(this.result['response']['docs'].length==0)
                        {
                          this.flash.show("No result found!",{cssClass:'alert-warning',timeout:5000});
                                      return false;
                        }
                
                                    },

                            err => {
                                      this.flash.show("Oops.. SORRY! Our Backend Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info table-success',timeout:5000});
                                      return false;
                                }
              
              
                                                      );
      

      }
    
  );
        
                              
                              
                              
                              
                              
              }
        else{
                    let keywords = this.keyword.split(" ");
                   let corrected ="";
                   var itemsProcessed =0;
                  
                    keywords.forEach(
                      (item) => {
                                  itemsProcessed++;
                            //console.log("Item is "+item+"###");
                                if(!(item===" " || item==="")){
                                this.spellingService.spell(item).subscribe(data=>{
                              corrected+=" "+(data.correct);
                              if(itemsProcessed==numWords) {cb(corrected);}
                        

                        }
                      
                    ); }
                    
        });
        
        
        
        
        var cb =(c:String)  =>
                                {
                                    // console.log("C = "+c.trim());
                                    // console.log(" Current keyword "+this.keyword);
                                    if(c.trim()===this.keyword.trim()){this.correctedKeywords=null;}
                                    else{
                                      this.correctedKeywords=c.trim();
                                    }
                                    console.log(this.correctedKeywords+ " is the corrected words");

                                    this.searchService.search_with_pageRank(c).subscribe(data=>{
                                    this.result=data;
                                              if(this.result['response']['docs'].length==0)
                                              {
                                                this.flash.show("No result found!",{cssClass:'alert-warning',timeout:5000});
                                                            return false;
                                              }
                                      
                                                          },
                      
                                                  err => {
                                                            this.flash.show("Oops.. SORRY! Our Backend Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info table-success',timeout:5000});
                                                            return false;
                                                      }
                                    
                                    
                                                                            );
                                
                                
                                
                                
                                };
        

    
  }    
          }

      return false;
    }
  }


  clear()
  {
    this.result=null;

    console.log("Before reset page rank = "+this.pageRank);
   
    let checkEleme =document.getElementById('keywordautocomplete-list');
    if(checkEleme!=null || checkEleme!=undefined)
    {
      checkEleme.parentNode.removeChild(checkEleme);
    
    }
  document.forms[0].reset();
  
  this.pageRank=true;
  
  
  
    document.getElementById('keyword').style.borderLeft="8px solid red";
  }




  suggest(ev)
  {
    // this.result=null;
    // this.suggestResult=null;
             let checkEleme =document.getElementById('keywordautocomplete-list');
              if(checkEleme!=null || checkEleme!=undefined)
              {
                checkEleme.parentNode.removeChild(checkEleme);
              
              }
    if(ev.keyCode!=13)
    {
        this.result=null;
        this.suggestResult=null;
   
          if(this.keyword!=undefined && this.keyword.length>0  ){//here


           
            let numwords = this.keyword.trim().split(" ").length
            



            document.getElementById('keyword').style.borderLeft="8px solid rgb(15, 195, 15)";

            if( this.keyword.indexOf(' ')==-1){




            
            //console.log("coming here");

         
            this.suggestorService.suggest(this.keyword).subscribe(data=>{
              
              this.suggestResult=data;
              //console.log("Data assigned");


              let a;
            let inp = document.getElementById('keyword');
            
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", "keyword"+ "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            
            inp.parentNode.appendChild(a);
            
      
            let arr = this.suggestResult['suggestions'];
            //console.log("Creting elements");
            for (let i = 0; i < this.suggestResult['suggestions'].length; i++) {
              //console.log("In loop");
               let b = document.createElement("DIV");
               
                b.innerHTML = "<strong>" + arr[i]['term'] + "</strong>";
               
                b.innerHTML += "<input type='hidden' value='" + arr[i]['term'] + "'>";
               
                    b.addEventListener("click", (e)=> {
                     // console.dir(e);
                     inp.setAttribute('value',b.innerText);
                     //inp.trigger('change');
                     this.keyword = b.innerText;
                     inp.focus();
                    // console.log(this.keyword);
                     a.parentNode.removeChild(a);

                     
                });
                a.appendChild(b);
               // console.log("appended the child");
              
            }
           
                          },

                  err => {
                            this.flash.show("Oops.. SORRY! Our Suggestor Service Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info table-success',timeout:5000});
                            return false;
                      }
    
    
      );
    }
  
  
  else{
            let new_keyword = this.keyword.trim();
           // console.log("Cmming in space section");
            //console.log(" overall keyword = "+new_keyword);
            let word_left_for_suggestion = new_keyword.split(" ")[new_keyword.split(" ").length-1];
            //console.log("Left word for suggestion "+word_left_for_suggestion);

            let pre_words = new_keyword.substr(0,new_keyword.lastIndexOf(" "));
            if(numwords == 1)
            {}
            else{


              this.suggestorService.suggest(word_left_for_suggestion).subscribe(data=>{
              
                
                
                  let local_count =0;
                  for(local_count=0;local_count<data['suggestions'].length;local_count++)
                  {
                    data['suggestions'][local_count]['term']=pre_words+" "+data['suggestions'][local_count]['term'];
                  }
                
                this.suggestResult=data;
                //console.log("Data assigned");
  
  
                let a;
              let inp = document.getElementById('keyword');
              
              /*create a DIV element that will contain the items (values):*/
              a = document.createElement("DIV");
              a.setAttribute("id", "keyword"+ "autocomplete-list");
              a.setAttribute("class", "autocomplete-items");
              
              inp.parentNode.appendChild(a);
              
        
              let arr = this.suggestResult['suggestions'];
              //console.log("Creting elements");
              for (let i = 0; i < this.suggestResult['suggestions'].length; i++) {
                //console.log("In loop");
                 let b = document.createElement("DIV");
                 
                  b.innerHTML = "<strong>" + arr[i]['term'] + "</strong>";
                 
                  b.innerHTML += "<input type='hidden' value='" + arr[i]['term'] + "'>";
                 
                      b.addEventListener("click", (e)=> {
                       // console.dir(e);
                       inp.setAttribute('value',b.innerText);
                       //inp.trigger('change');
                       this.keyword = b.innerText;
                       inp.focus();
                      // console.log(this.keyword);
                       a.parentNode.removeChild(a);
  
                       
                  });
                  a.appendChild(b);
                 // console.log("appended the child");
                
              }
             
                            },
  
                    err => {
                              this.flash.show("Oops.. SORRY! Our Suggestor Service Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info table-success',timeout:5000});
                              return false;
                        }
      
      
        );


            }

      }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }//here
    else{
      document.getElementById('keyword').style.borderLeft="8px solid red";
    }
        
  }

  }













// Method to find maximum of 2 integers
min(a,b)
{
  return (a>b?b:a);
}


/**
 * @description Computes the snippet for a given document
 */

 generate_snippet(doc)
 {

  
   var terms_in_query = this.keywordStatic.split(' ');
  


   
  //  console.log( terms_in_query.length);
   if(doc)
   {

    //checking exact match of the query 
     for(let field in doc)
     {
      // console.log(typeof doc[field])
          if(doc.hasOwnProperty(field))
          {
            
            if(String(doc[field][0]).toLowerCase().indexOf(this.keyword.toLowerCase())!=-1){
              // console.log("FULL"+String(doc[field][0]).substr(0,160));
              return String(doc[field][0]).substr(0,160);}
          }
     }

     //checking all query present terms
          outer:
            for(let field in doc)
            {
                let check_all = 0;
                  if(doc.hasOwnProperty(field))
                  {
                    
                    for(let term in terms_in_query)
                    {
                      //console.log(term);
                        if(String(doc[field][0]).toLowerCase().indexOf(terms_in_query[term].toLowerCase())!=-1){
                          check_all=1;}

                        else{ check_all=0;continue outer;}
                    }
                    if(check_all===1){
                    return String(doc[field][0]).substr(0,160);}
                  }
                  

            }

        //checking if any of the query terms meet the sentence

        for(let field in doc)
        {
            
              if(doc.hasOwnProperty(field))
              {
                for(let term in terms_in_query)
                {
                    if(String(doc[field][0]).toLowerCase().indexOf(terms_in_query[term].toLowerCase())!=-1){
                      //console.log("PARTIAL"+String(doc[field][0]).substr(0,160));
                    return String(doc[field][0]).substr(0,160);
                    }
                   
                }
              }
              

        }

        return "EMPTY";



   }
 }


}


















// process()
// {
//   // console.log("process called");
//   let checkEleme =document.getElementById('keywordautocomplete-list');
//   if(checkEleme!=null || checkEleme!=undefined)
//   {
//     checkEleme.parentNode.removeChild(checkEleme);
//   }

// //  console.log("Hi"+this.keyword);
  
//   if(this.keyword==undefined || this.keyword.length==0)
//   {
//       this.result=null;
//       this.flash.show("Please enter a Keyword!!",{cssClass:'alert-danger',timeout:2000});
//       return false;
//   }

//   else{
//     this.keywordStatic=this.keyword;
      
//      // document.getElementById('keyword').blur();

//         if(!this.pageRank){


          
//             this.searchService.search(this.keyword).subscribe(data=>{
//             this.result=data;
//             if(this.result['response']['docs'].length==0)
//             {
//               this.flash.show("No result found!",{cssClass:'alert-warning',timeout:5000});
//                           return false;
//             }
     
//                         },

//                 err => {
//                           this.flash.show("Oops.. SORRY! Our Backend Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info table-success',timeout:5000});
//                           return false;
//                     }
  
  
//     );
//       }


//     else{
//                       this.searchService.search_with_pageRank(this.keyword).subscribe(data=>{
//                         this.result=data;
//                         if(this.result['response']['docs'].length==0)
//                         {
//                           this.flash.show("No result found!",{cssClass:'alert-warning',timeout:5000});
//                                       return false;
//                         }
                    
//                                         },

//                                 err => {
//                                           this.flash.show("Oops.. SORRY! Our Backend Service seems to be snoozing. Be back in a while...",{cssClass:'alert-info',timeout:5000});
//                                           return false;
//                                     }
                  
                  
//                     );
//         }

//     return false;
//   }
// }

