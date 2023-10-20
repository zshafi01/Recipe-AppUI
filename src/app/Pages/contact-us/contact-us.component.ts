import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css','./contact-us2.component.css', './contact-us3.component.css','./btn.component.css','./input.component.css']
})
export class ContactUsComponent implements OnInit {
  contact:Contact= new Contact();
  showAlert:string= "none";
  showContactForm:string= "block";
  showDangarAlert:string="none";

  constructor(private save:RegistrationBackendService, private router:Router){}

  ngOnInit(): void {
  }

  onSubmit(){
    this.save.sendEmailToUs(this.contact).subscribe({
      next:(data)=>{
        // this.saveContact();
        this.showAlert= "block";
        this.showContactForm = "none";
      },
      error:(error)=>{
        this.showDangarAlert = "block";
        console.error(error);
      }
    })

  }

  // saveContact(){
  //   this.save.registorContact(this.contact).subscribe({
  //     next:(data)=>{
  //       console.log("registor successfully!");
      
  //     }
  //   })
  // }


}
