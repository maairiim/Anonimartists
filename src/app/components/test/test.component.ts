import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { map } from 'rxjs/operators';
import { Question } from '../../models/question.model';
import { PixabayService } from '../../services/pixabay.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public questions = []; 
  public question: Question;
  public answer1=''
  public answer2=''
  public answer3=''
  public answer4=''

  constructor(public questionService: QuestionService, public pixabayService: PixabayService ) { }

  obtenerQuestion() {
    this.question = this.questions[Math.floor(Math.random() * this.questions.length-1 ) + 1];

    this.pixabayService.getImages(this.question.answer1).pipe(
      map(images => {
        this.answer1 = images['hits'][Math.floor(Math.random() * this.questions.length - 1) + 1].webformatURL;
        // console.log(this.answer1);
      })
    ).subscribe();

    this.pixabayService.getImages(this.question.answer2).pipe(
      map(images => {
        this.answer2 = images['hits'][Math.floor(Math.random() * this.questions.length - 1) + 1].webformatURL;
        // console.log(this.answer2);
      })
    ).subscribe();

    this.pixabayService.getImages(this.question.answer3).pipe(
      map(images => {
        this.answer3 = images['hits'][Math.floor(Math.random() * this.questions.length - 1) + 1].webformatURL;
        // console.log(this.answer3);
      })
    ).subscribe();

    this.pixabayService.getImages(this.question.answer4).pipe(
      map(images => {
        this.answer4 = images['hits'][Math.floor(Math.random() * this.questions.length - 1) + 1].webformatURL;
        // console.log(this.answer4);
      })
    ).subscribe();

    // console.log(this.question);
  }



  ngOnInit(): void {
    this.question = new Question();
    this.questionService.questions.pipe(
      map(res => {
        this.questions = res;
        this.obtenerQuestion();
      } )
    ).subscribe();
  }

}
