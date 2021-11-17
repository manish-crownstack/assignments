import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  user :any;
  constructor(
    private authService : AuthService
  ) { 
    this.authService.isLoggedIn.subscribe(x=> this.user = x)
  }

  ngOnInit(): void {
  }

}
