import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading=false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onLogIn(form:NgForm) {

    this.isLoading=true;
    if(form.valid){

      this.authService.logIn(form.value).subscribe(resData=>{
        console.log("Successfully signed in!");
        console.log(resData);
        this.isLoading=false;
        this.router.navigateByUrl('/tasks/tabs/explore');
      })
    }
  }

}
