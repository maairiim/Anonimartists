import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApodService {

  date = '';
  constructor(private http: HttpClient  ) {
    //console.log('apod service ok');
    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    
    // console.log(this.date);
   }
  getImage(query: string) {

    const url = `https://api.nasa.gov/planetary/apod?api_key=oGUw6db3Pb5kfg6FsnTicCYDERBOnrubknAOAn2t&date=${query}`;

    return this.http.get(url);
  }
}
