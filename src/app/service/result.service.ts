import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';
@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor() { }
  padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
  formatTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(
      seconds
    )}`;
  }
  calculateTotalScore(result : Result): string {
    console.log(result.chosenAnswers);
    console.log(result.quiz.questions)
    let score = 0;
    for (let i = 0; i < result.quiz.questions.length; i++) {
      const correctAnswer = result.quiz.questions[i].correctAnswer;
      const chosenAnswer = result.chosenAnswers[i];

      if (chosenAnswer) {
        if (chosenAnswer === correctAnswer) {
          score++;
        }
      }
    
    } 
     return `${score} / ${result.quiz.questions.length}`;
  }
  
}
