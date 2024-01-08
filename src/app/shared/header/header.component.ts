import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModelResponse } from 'src/app/models/auth-model-response';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  authUser: AuthModelResponse = null;

  constructor(private authServive: AuthenticationService, private router:Router) {}

  ngOnInit(): void {
    this.authServive.user.subscribe({
      next:(data)=>{
        this.authUser =data;

      },
      error:(error)=>{
        console.error();}
      
    });  }

  onLogout() {
  this.authServive.removeSession();
  this.authUser= null;   
  this.router.navigate(['/home']);
  }
}
