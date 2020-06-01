import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = 'users';

  constructor(private af: AngularFirestore) { }

  public getUser(uid: string) {
    let user: Observable<User>;
    user = this.af.doc<User>(`/${this.dbPath}/${uid}`).valueChanges();
    return user;
  }

  public addUser(user: User) {
    const userFull = {
      ...user,
    };
    return this.af.doc<User>(`/${this.dbPath}/${user.uid}`).set(userFull);
  }

  public updateUser(user: User) {
    return this.af.doc<User>(`/${this.dbPath}/${user.uid}`).update(user);
  }

  public deleteUser(uid: string) {
    return this.af.doc<User>(`/${this.dbPath}/${uid}`).delete();
  }


}
