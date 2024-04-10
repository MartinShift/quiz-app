import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { QuizService } from '../service/quiz.service';
import { Quiz } from '../models/quiz.model';
import { ResultService } from '../service/result.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  quizzes: Quiz[] = [];
  timeLimitEnabled: boolean = false;
  constructor(private quizService: QuizService, public resultService: ResultService) {
    this.timeLimitEnabled = localStorage.getItem("isTimeLimit") == "true";
  }

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }
  toggleTimeLimit(event: Event): void {
    this.timeLimitEnabled = !this.timeLimitEnabled;
    localStorage.setItem("isTimeLimit",this.timeLimitEnabled.toString());
  }
}