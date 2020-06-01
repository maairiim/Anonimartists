export class Registry {
    id?: string;
    question?: string;
    answer?: string;
    displayName?: string;
    createdAt: number;
    score?: number;

    constructor() {
        this.id = '';
        this.answer = '';
        this.question = '';
        this.displayName = '';
        this.createdAt = 0;
        this.score = 0;
    }
}