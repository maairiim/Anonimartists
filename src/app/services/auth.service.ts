import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// Auth Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
import { User } from '../models/user.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private afAuth: AngularFireAuth, private userService: UserService, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async registerEmailAndPassword(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  async loginGoogle() {
    this.user = new User();
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(

      async user => {
        this.userService.getUser(user.user.uid).subscribe(
          userProfile => {
            if (userProfile === undefined) {
              this.user.uid = user.user.uid;
              this.user.displayName = user.user.displayName;
              this.user.email = user.user.email;
              this.user.photoURL = user.user.photoURL;
              this.user.status = true;
              this.userService.addUser(this.user);
            }
            this.currentUserSubject.next(userProfile);
          }
        );  
        this.router.navigateByUrl('home');
      });
  }
  
  async logout() {
    this.currentUserSubject.next(null);
    return this.afAuth.signOut().then(
      resp => {
        this.router.navigateByUrl('home');
      }
    );
  }

  async resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
