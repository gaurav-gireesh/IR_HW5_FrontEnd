import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {FlashMessagesService} from  'angular2-flash-messages';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import {SearchService} from './services/search.service';
import {SuggestorService} from './services/suggestor.service'

import {SpellCheckerService}  from './services/spell-checker.service'
const appRoutes:Routes=[
  
  { path:"search", component: SearchResultComponent }
  
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FlashMessagesService,SearchService,SuggestorService,SpellCheckerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
