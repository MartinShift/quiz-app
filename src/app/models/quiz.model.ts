import { Question } from './question.model';

export class Quiz {
  constructor(
    public id: string | undefined,
    public title: string,
    public description: string,
    public timeLimit: number,
    public imageUrl: string,
    public questions: Question[]
  ) {}
}