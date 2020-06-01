import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  user: User
  constructor( public authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.authService.currentUser.pipe(
      map(user => this.user = user)
    ).subscribe();
    console.log(this.user);
  }

}
