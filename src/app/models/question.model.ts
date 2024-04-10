export class Question {
    constructor(
      public id: string | undefined,
      public question: string,
      public options: string[],
      public correctAnswer: string,
      public imageUrl: string
    ) {}
  }