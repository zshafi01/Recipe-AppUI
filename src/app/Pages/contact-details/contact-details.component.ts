import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  id!:number;
contactDetail:Contact = new Contact()

  constructor (private view:ViewBackendService,private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.showContactDetailById(this.id);
  }

  showContactDetailById(id: number){
    this.view.getContactById(id).subscribe({
      next:(data)=>{
        this.contactDetail=data;
        console.log(data);
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

}
