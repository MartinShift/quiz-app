// result.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../service/quiz.service';
import { Result } from '../models/result.model';
import { Quiz } from '../models/quiz.model';
import { CommonModule } from '@angular/common';
import { ResultService } from '../service/result.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone:true,
  imports: [CommonModule,NavbarComponent]
})
export class ResultComponent implements OnInit {
  result: Result;

  isLoading: boolean;

  constructor(private route: ActivatedRoute, private quizService: QuizService, public resultService: ResultService) 
  { 

  }

  ngOnInit(): void {
    this.isLoading = true;
    const resultId = (this.route.snapshot.paramMap.get('id') ?? "1");
    this.quizService.getResultById(resultId).subscribe(result => {
      this.result = result;
      this.isLoading = false;
    });
  }
    
}
