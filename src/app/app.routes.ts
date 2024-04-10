import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { ResultListComponent } from './result-list/result-list.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quiz/:id', component: QuizComponent },
    { path: 'result/:id', component: ResultComponent },
    { path: 'result', component: ResultListComponent },
    { path: 'add-quiz', component: AddQuizComponent }
  ];
