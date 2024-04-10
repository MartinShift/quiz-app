import { Component } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { Quiz } from '../models/quiz.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
  standalone:true,
  imports: [FormsModule, CommonModule,NavbarComponent, RouterOutlet]
})
export class AddQuizComponent {
  quiz: Quiz = {
    id: undefined,
    title: '',
    description: '',
    imageUrl: '',
    questions: [{id: undefined, question:"", options:['','','',''], imageUrl:"", correctAnswer:""}],
    timeLimit: 0
  };
  imageFile: File | null = null;

  constructor(private quizService: QuizService, private http : HttpClient, private router: Router) {}
  updateOption(option: string, questionIndex: number, optionIndex: number): void {
    this.quiz.questions[questionIndex].options[optionIndex] = option;
    console.log(this.quiz.questions)
  }
  addQuestion(): void {
    this.quiz.questions.push(new Question(undefined, "", ['','','',''], "", ""));
  }

  addOption(questionIndex: number): void {
    this.quiz.questions[questionIndex].options.push('');
  }

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.imageFile = inputElement.files[0];
      console.log(this.imageFile);
    }
  }
  onOptionChange(newValue: string, questionIndex: number, optionIndex: number) {
    this.quiz.questions[questionIndex].options[optionIndex] = newValue;
    // Optionally, you can add logic to trigger change detection manually here.
  }
  submitQuiz(): void {
    if (this.imageFile) {

      this.quizService.uploadImage(this.imageFile)
      
        this.quiz.imageUrl = "/assets/images/" + this.imageFile.name;
        this.saveQuiz();
    } else {
      this.saveQuiz();
    }
  }

  private saveQuiz(): void {
    this.quizService.addQuiz(this.quiz).subscribe(() => {
      this.router.navigate(['/']);
    }, (error) => {
      // Handle error
    });
  }
}
