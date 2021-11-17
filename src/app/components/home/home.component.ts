import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user : any;
  constructor(
    private authService : AuthService
  ) { 
    this.authService.isLoggedIn.subscribe(x=> this.user = x)
  }

  ngOnInit(): void {
    
  }

}
