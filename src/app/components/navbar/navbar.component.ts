import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = "Anonimartists";
  public user: User;
  public isActive: boolean = false;

  constructor(public authService: AuthService, private router: Router) { 
    this.authService.currentUser.subscribe(
      user => {
        if (user){
          this.user = user;
          this.isActive = user.status;
        }else{
          this.isActive = false;
        }
      }
    );
  }

  loginWithGoogle() { this.authService.loginGoogle(); }

  logout() { this.authService.logout(); }

  ngOnInit(): void {
  }

}
