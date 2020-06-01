import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { TestComponent } from './components/test/test.component';
import { QuestionNewComponent } from './components/question-new/question-new.component';
import { AboutComponent } from './components/about/about.component';
import { RecordComponent } from './components/record/record.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'test', component: TestComponent },
  { path: 'record', component: RecordComponent },
  { path: 'question-new', component: QuestionNewComponent },
  { path: 'about', component: AboutComponent },
  

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
