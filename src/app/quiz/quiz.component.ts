// quiz.component.ts
import { Component, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QuizService } from '../service/quiz.service';
import { Result } from '../models/result.model';
import { CommonModule } from '@angular/common';
import { ResultService } from '../service/result.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports:[CommonModule, NavbarComponent]
})
export class QuizComponent implements OnInit {
  quiz: Quiz;
  currentQuestionIndex: number = 0;
  result: Result;
  remainingTime: number ; 
  timerSubscription: Subscription;
  isLoading: boolean

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    public resultService: ResultService
  ) { 
  }
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const quizId = params['id'];
      this.quizService.getQuizById(quizId).subscribe((quiz) => {
        this.quiz = quiz;
        this.result = new Result(undefined,this.quiz,[],0);
        this.startTimer();
        this.isLoading = false;
        this.remainingTime = quiz.timeLimit;
      });
    });
  }

  startTimer(): void {
    let isTimeLimit = localStorage.getItem("isTimeLimit") == "true";
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.remainingTime > 0 || !isTimeLimit) {
        this.remainingTime--;
      } else {
        this.submitQuiz();
      }
    });
}

  onSelectAnswer(answer: string): void {
    this.result.chosenAnswers.push(answer);
    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.submitQuiz();
    }
  }

  submitQuiz(): void {
    this.timerSubscription.unsubscribe();
    this.result.timeSpent = this.quiz.timeLimit - this.remainingTime;
    this.result.quiz = this.quiz;
    this.quizService.postResult(this.result).subscribe((response)=>{
    this.router.navigate(['/result', response.id]);
    })
  }
}
