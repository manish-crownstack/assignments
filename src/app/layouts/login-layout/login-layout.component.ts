import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
    <div class="mat-drawer-container" style="height : 100vh">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
