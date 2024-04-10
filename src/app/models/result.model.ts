import { Quiz } from './quiz.model';

export class Result {
  constructor(
    public id: string | undefined,
    public quiz: Quiz,
    public chosenAnswers: string[],
    public timeSpent: number 
  ) {}
}
