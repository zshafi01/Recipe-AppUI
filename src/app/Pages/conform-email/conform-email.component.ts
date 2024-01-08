import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureOtp } from 'src/app/models/secure-otp';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';

@Component({
  selector: 'app-conform-email',
  templateUrl: './conform-email.component.html',
  styleUrls: ['./conform-email.component.css']
})
export class ConformEmailComponent implements OnInit {

  secureOtp:SecureOtp= new SecureOtp();

  constructor (private save:RegistrationBackendService, private router:Router){}

  ngOnInit(): void {
  }

  onSubmit(){
    this.save.conformEmail(this.secureOtp).subscribe({
      next:(data)=>{
        this.router.navigate(["/otp/" + this.secureOtp.email])       
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
  }
  


