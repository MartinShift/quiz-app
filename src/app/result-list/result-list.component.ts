import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { Result } from '../models/result.model';
import { CommonModule } from '@angular/common';
import { ResultService } from '../service/result.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-results',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
  standalone:true,
  imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet, NavbarComponent]
})
export class ResultListComponent implements OnInit {
  results: Result[] = [];

  constructor(private quizService: QuizService, public resultService: ResultService) { }

  ngOnInit(): void {
    this.quizService.getResults().subscribe(results => {
      this.results = results;
    });
  }
}
