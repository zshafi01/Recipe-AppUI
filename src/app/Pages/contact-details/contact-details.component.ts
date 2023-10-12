import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Reply } from 'src/app/models/reply';
import { DeleteBackendService } from 'src/app/services/delete-backend.service';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';
import { UpdateBackendService } from 'src/app/services/update-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  id!:number;
  display:string ="none";
  alertDisply:string ="none";
  contactDetail:Contact = new Contact();
  reply:Reply = new Reply();
  countTrash:number=0;
  countInbox:number=0;
  countAll:number =0;
  countFavorite:number =0;
  isViewed:boolean= false;
  isTrash:boolean = true;
  isFavorite:boolean = true;
  isDeleted:boolean=false;
  deleteStatus:boolean = true;
  currentDate:Date =new Date();


  constructor (private view:ViewBackendService, private add:RegistrationBackendService, private deleteService:DeleteBackendService, private update:UpdateBackendService, private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.showContactDetailById(this.id);
    this.countTotalEmail();
    this. countTotalTrashEmail();  
    this.countAllEmail();
    this.countAllFavoiteEmail(true);
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
  onReplyClick(){
    this.display = "block";
  }

  onSubmit(){
    this.reply.from="suport@recipe.com";
    this.reply.to= this.contactDetail.email;
    this.reply.subject = this.contactDetail.subject;
    // console.log(this.reply);
  this.replyEmail();

  }
  replyEmail(){
    this.add.replyEmail(this.reply).subscribe({
      next:(data) => {
        this.alertDisply = "block";
        this.display= "none";

      },
      error:(error) => {
        console.error(error);
      }
    })
  }
  countTotalEmail(){
    this.view.getCountTotalEmail(this.isDeleted, this.isViewed).subscribe({
      next:(data)=>{
        this.countInbox = data;
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  countTotalTrashEmail(){
    this.view.getCountTotalEmail(this.isTrash, this.isViewed).subscribe({
      next:(data)=>{
        this.countTrash = data;
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
  countAllEmail(){
    this.view.getCountAllEmail().subscribe({
      next:(data)=>{
        this.countAll = data;
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
  countAllFavoiteEmail(isFavorite:boolean){
    this.view.getAllFavoriteEmail(isFavorite).subscribe({
      next:(data)=>{
        this.countFavorite = data
      },
      error:(error)=> {
        console.error(error);

      }
    })

  }

  updateFavoriteStatus(id:number,isFavorite:boolean){
    this.update.updateFavoriteStatus(id, isFavorite).subscribe({
      next:(data)=> {
      //  this.countAllFavoiteEmail(true);
      window.location.reload();

      },
      error:(error)=> {
        console.error(error);
      }
    })
  }
  isRead(id:number, isViewed:boolean){
    this.update.updateContactByViewStatus(id, isViewed).subscribe({
      next:(data)=>{

      },
     error:(error)=>{
      console.error(error);
     }
           
    })
  }
  onDeleteStatus(id: number, isDeleted:boolean){
    this.deleteService.updateDeleteStatus(id, isDeleted).subscribe({
      next:(data)=>{
      // this.isRead(id, false);
      this.ngOnInit();
      // window.location.reload(); //to refresh the page
      },
      error:(error)=>{
        console.error(error);
      }    
    })
  }
  onTrashclick(id:number, isDeleted:boolean){
    this.onDeleteStatus(id, isDeleted);
    
  }

}
