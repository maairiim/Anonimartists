import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private dbPath = 'questions';
  private questionsCollection: AngularFirestoreCollection<Question>;
  public questions: Observable<Question[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.questionsCollection = this.angularFirestore.collection<Question>(this.dbPath, ref => ref.orderBy('question', 'desc'));
    this.questions = this.questionsCollection.valueChanges();
  }

  public getQuestion(id: string) {
    let question: Observable<Question>;
    question = this.angularFirestore.doc<Question>(`/${this.dbPath}/${id}`).valueChanges();
    return question;
  }

  public addQuestion(question: Question) {
    let postFull;
    const newId = this.angularFirestore.createId();
    postFull = {
      ...question,
      id: newId
    }
    return this.angularFirestore.doc(`/${this.dbPath}/${newId}`).set(postFull);
  }

  public updateQuestion(question: Question) {
    return this.angularFirestore.doc<Question>(`/${this.dbPath}/${question.id}`).update(question);
  }

  public deleteQuestion(question: Question) {
    return this.angularFirestore.doc<Question>(`/${this.dbPath}/${question.id}`).delete();
  }
}
