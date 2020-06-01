import { Component, OnInit } from '@angular/core';
import { PixabayService } from '../../services/pixabay.service';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title = 'Anonimartists';
  images = [];
  termino;

  constructor(private px: PixabayService) {
    this.clear();
  }
  onSubmit(form: NgForm) {
    console.log(this.termino);
    this.images = [];
    this.px.getImages(this.termino).pipe(
      map(a => {
        //console.log(a);
        a['hits'].forEach(element => {
          //console.log(element['largeImageURL']);
          this.images.push(element['largeImageURL'])
        });
      })
    ).subscribe();
  }
  clear() {
    this.termino = '';
  }

  ngOnInit(): void {
  }

}
