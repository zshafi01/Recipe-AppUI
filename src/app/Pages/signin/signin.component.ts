import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModelRequest } from 'src/app/models/auth-model-request';
import { AuthModelResponse } from 'src/app/models/auth-model-response';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user:AuthModelRequest = new AuthModelRequest();
  authResult:AuthModelResponse = new AuthModelResponse();
  role:string = " "

  constructor(private auth:AuthenticationService, private router:Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public onSubmit(){
    this.auth.authentication(this.user).subscribe({
      next: (data) => {

        console.log("data:" , data);
        // this.authResult =data as AuthModelResponse;
        this.authResult = data;
        
        this.authResult.tokenExpireTime = (new Date()).getTime() + 1.44e+7 + ''; // adding 4hr expireTime
        localStorage.setItem('user', JSON.stringify(this.authResult));
        console.log("result:" , this.authResult);
        this.role = data["roles"];
        if(this.role =='USER'){
          this.router.navigate(['user-dashboard']);       

        }else if (this.role =='ADMIN'){
          this.router.navigate(['admin-dashboard']);
          
        } else {
          this.router.navigate(['**']);

          
        } 
       
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {},
    });

  }


}
