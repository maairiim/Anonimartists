import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question.model';
import { NgForm } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.css']
})
export class QuestionNewComponent implements OnInit {

  public question: Question;
  public questions = [];
  constructor(private questionService: QuestionService) { 
    this.question = new Question();
    this.questionService.questions.pipe(
      map( q => this.questions = q)
    ).subscribe();
  }

  onSubmit(form: NgForm){
    if (form.invalid) 
      return;
    console.log(this.question);
    this.questionService.addQuestion(this.question);
  }

  deleteQuestion(question: Question)
  {
    this.questionService.deleteQuestion(question);
  }
  ngOnInit(): void {
  }

}
