import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApodService } from './services/apod.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private date = '';
  public imageToDay;
  
  constructor( private apodService: ApodService ){
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  
    this.apodService.getImage(this.date).pipe(
      map( (a:any) => this.imageToDay = a.hdurl)
    ).subscribe();
  }
 
}
