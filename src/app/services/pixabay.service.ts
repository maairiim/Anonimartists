import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PixabayService {

  constructor( private http: HttpClient ) { 
    //console.log('pixabay service ok');
  }

  getImages(query: string) {

    const url = `https://pixabay.com/api/?key=4605774-c7464537135c94600952e723f&q=${query}`;

    return this.http.get(url);

  }

}
