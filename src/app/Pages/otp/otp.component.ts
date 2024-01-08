import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecureOtp } from 'src/app/models/secure-otp';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{

  char1:string;
  char2:string;
  char3:string;
  char4:string;
  char5:string;
  char6:string;
  secureOtp:SecureOtp= new SecureOtp();
  email:string;
  message:string = null;

  constructor(private save:RegistrationBackendService, private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.email =this.route.snapshot.params['email'];
  }

  onSubmit(){
    this.secureOtp.email = this.email;
    this.secureOtp.otp = this.char1 + this.char2 + this.char3 +this.char4 + this.char5 + this.char6
    this.save.checkOtp(this.secureOtp).subscribe({
      next:(data)=>{
        this.router.navigate(["/signup/" + this.secureOtp.email])       
      },
      error:(error)=>{
        this.message = "please enter valid otp!"
        console.error(error);
      }
    })
  }
  }

    
   

