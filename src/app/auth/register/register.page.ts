import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!:FormGroup;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.registerForm=new FormGroup({
      name:new FormControl('Jovana',Validators.required),
      surname:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(5)]),
    });
  }

  onRegister(){
    this.authService.register(this.registerForm.value).subscribe(resData=>{
      console.log("Successfull registration!");
      console.log(resData);
    })
  }

}
