export class User {
    uid?: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    status?: boolean;

    constructor() {
        this.uid = '';
        this.displayName = '';
        this.email = '';
        this.photoURL = '';
        this.status = false;
    }
}