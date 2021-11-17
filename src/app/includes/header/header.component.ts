import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavEvent = new EventEmitter<boolean>();
  sideNavOpened : boolean = true;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.authService.logout();
  }
  toggleSideNav(){
    this.sideNavOpened= !this.sideNavOpened;
    this.sideNavEvent.emit(this.sideNavOpened);
  }

}
