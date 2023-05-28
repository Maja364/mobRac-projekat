import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading=false;

  constructor(private authService: AuthService, private router: Router,private alertCtrl:AlertController) { }

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
      },
      errRes=>{
        console.log(errRes);
        this.isLoading=false;
        let message="Incorrecr email or password";
        const code=errRes.error.error.message;
        if(code==="EMAIL_NOT_FOUND"){
          message="Email address could not be found";
        }else if(code==="INVALID_PASSWORD"){
          message="Password is not correct";
        }

        this.alertCtrl.create({
          header:"Authentication failed.",
          message,
          buttons:['Okay']
        }).then((alert:HTMLIonAlertElement)=>{
          alert.present();
        });
        form.reset();
      }
      );
    }
  }

}
