export class Question {
    id?: string;
    question?: string;
    answer1?:string;
    answer2?:string;
    answer3?:string;
    answer4?:string;

    constructor() {
        this.question = '';
        this.answer1 = '';
        this.answer2 = '';
        this.answer3 = '';
        this.answer4 = '';
    }
}