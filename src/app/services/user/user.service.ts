import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router
  ) { }

  add(user): Observable<any>{
    if(localStorage.getItem(user.email)){
      return throwError(() => {
        const error: any = new Error(`Email Already Exists`);
        return error;
     });
    }
    
    return of(this.setUserToLocalStorage(user.email,user));
  }

  update(email,user): Observable<any>{
    localStorage.removeItem(email);
    return of(this.setUserToLocalStorage(email,user));
  }


  private setUserToLocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value));
    return JSON.parse(localStorage.getItem(key));
  }

  get(id): Observable<any>{
    return of(JSON.parse(localStorage.getItem(id)));
  }
}
