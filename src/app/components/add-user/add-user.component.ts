import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

class CustomValidators {
  
  static passwordsMatch (control: AbstractControl): ValidationErrors {
    const password = control.get('password').value;
    // console.log("dd",control.get('password'))
    const confirmPassword = control.get('confirmPassword').value;

    if((password === confirmPassword) && (password !== null && confirmPassword !== null)) {
      // console.log('no err',password,confirmPassword)
      return null;
    } else {
      // console.log('here',password,confirmPassword)
      return {passwordsNotMatching: true};
    }
  }
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})


export class AddUserComponent implements OnInit {
  form : FormGroup ;
  isAddMode : boolean = false;
  id :string;
  emailError : boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private userService : UserService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    
    if (this.isAddMode) {
        var passwordValidators = [Validators.minLength(8),Validators.required];
    }
    
    this.form = this.fb.group({     
      name: [null, [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$")
      ]],
      email: [null, [
        Validators.required,
        Validators.email,
      ]],
      phone : [null, [
        Validators.required, 
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ]],
      gender : ['male'],
      password: [null, 
        this.isAddMode? passwordValidators : Validators.nullValidator 
      ],
      confirmPassword: [null, [
        Validators.required
      ]]
    },{
       validators: CustomValidators.passwordsMatch
    })
    if (!this.isAddMode) {
      this.userService.get(this.id)
          .subscribe(x =>{
            console.log("dd",x)
            this.form.patchValue(x)
      });
    }

     
  }

  onChange(e,u){
    console.log(e,u)
  }

  
  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    if(this.isAddMode){
      this.userService.add(this.form.value).subscribe(x=> {
          console.log('user',x)
          this.router.navigate(['/'])
        },(err)=>{
          if(err){
            this.emailError = true;
          }
        }
      );
    } else{
      this.userService.update(this.form.get('email').value,this.form.value)
      this.router.navigate(['/'])
    }   
    // console.log(this.form.value)
                 
  }

}
