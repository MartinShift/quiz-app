// quiz.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:3001'; 

  constructor(private http: HttpClient) {}

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quizzes`);
  }

  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/quizzes/${id}`);
  }
  postResult(result: Result): Observable<Result> {
    return this.http.post<Result>(`${this.baseUrl}/results`, result);
  }
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/quizzes`, quiz);
  }
  getResultById(id:string):Observable<Result>{
    return this.http.get<Result>(`${this.baseUrl}/results/${id}`);
  }
  getResults():Observable<Result[]>{
    return this.http.get<Result[]>(`${this.baseUrl}/results`);
  }
  uploadImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>('http://localhost:3000/upload.php', formData).toPromise();
  }
}
