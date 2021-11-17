import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup ;
  isFormValid : boolean = false;

  constructor(
    private fb: FormBuilder,         
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     
      userName: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isFieldInvalid(field: string) { 
    // console.log(this.form.get(field));
    
    console.log(this.form);
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.isFormValid)
    );
  }

  onSubmit() {
    
    if (!this.form.valid) {
      return;
       
    }
    this.authService.login(this.form.value);
    this.isFormValid = true;             
  }


}
