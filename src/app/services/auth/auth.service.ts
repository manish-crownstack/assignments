import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<object>(null); 

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  constructor(private router: Router) {

  }

  

  login(user){
    if (user.userName !== '' && user.password !== '' ) { 
      // logic of using local storage
      if(localStorage.getItem(user.userName)){
        this.loggedIn.next(JSON.parse(localStorage.getItem(user.userName)));
        this.router.navigate(['/']);
      }
      
      
    }
  }
  logout() {                            
    this.loggedIn.next(null);
    this.router.navigate(['/login']);
  }
}
