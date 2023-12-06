import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Reply } from 'src/app/models/reply';
import { DeleteBackendService } from 'src/app/services/delete-backend.service';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';
import { UpdateBackendService } from 'src/app/services/update-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-favorite',
  templateUrl: './admin-favorite.component.html',
  styleUrls: ['./admin-favorite.component.css','./admin-favorite-one.component.css','./admin-favorite-two.component.css','./admin-favorite-three.component.css']
})
export class AdminFavoriteComponent implements OnInit{
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
  pageNumber:number=0;
  pageSize:number=5;
  deleteStatus:boolean = true;
  keyword:string= "";
  currentDate:Date =new Date();
  contacts: Contact[] =[];
  pageSizeOptions = [5, 10, 25];
  length = 5;


  constructor (private view:ViewBackendService, private add:RegistrationBackendService, private deleteService:DeleteBackendService, private update:UpdateBackendService, private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    // this.showContactDetailById(this.id);
    this.countTotalEmail();
    this. countTotalTrashEmail();  
    this.countAllEmail();
    this.countAllFavoiteEmail(true);
    this.getAllContactByDeleteStatusAndKeyword(this.isTrash,this.keyword,this.pageNumber, this.pageSize)
  }

  // showContactDetailById(id: number){
  //   this.view.getContactById(id).subscribe({
  //     next:(data)=>{
  //       this.contactDetail=data;
  //       console.log(data);
  //     },
  //     error:(error)=>{
  //       console.error(error)
  //     }
  //   })
  // }
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
  handlePageEvent(event: any) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllContactByDeleteStatusAndKeyword(this.isDeleted,this.keyword,this.pageNumber, this.pageSize);

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
  // onDeleteStatus(id: number, isDeleted:boolean){
  //   this.deleteService.updateDeleteStatus(id, isDeleted).subscribe({
  //     next:(data)=>{
  //     // this.isRead(id, false);
  //     this.ngOnInit();
  //     // window.location.reload(); //to refresh the page
  //     },
  //     error:(error)=>{
  //       console.error(error);
  //     }    
  //   })
  // }
  onViewClickHandler(id:number){
    this.onViewStatusUpdate(id, true);
    this.router.navigate(['/contact/detail/' + id]);        

  }
  onDelete(id: number){
    this.deleteService.deleteContactById(id).subscribe({
      next:(data)=>{
      this.ngOnInit();
      // window.location.reload(); to refresh the page
      },
      error:(error)=>{
        console.error(error);
      }
      
    })

  }

  // onViewStatusUpdate(id:number, isViewed:boolean){
  //   this.update.updateContactByViewStatus(id, isViewed).subscribe({
  //     next:(data)=>{
  //     },
  //    error:(error)=>{
  //     console.error(error);
  //    }
           
  //   })
  // }
  onDeleteStatuses(id: number){
    this.deleteService.updateDeleteStatus(id, this.deleteStatus).subscribe({
      next:(data)=>{
      this.onViewStatusUpdate(id, false);
      this.ngOnInit();
      // window.location.reload(); to refresh the page
      },
      error:(error)=>{
        console.error(error);
      }    
    })
  }
  // onTrashclick(id:number, isDeleted:boolean){
  //   this.onDeleteStatus(id, isDeleted);
    
  // }
  onMoveOutOfTrash(id:number){
    this.onDeleteStatus(id);
    this.countTotalEmail();


  }
  onDeleteStatus(id: number){
    this.deleteService.updateDeleteStatus(id, false).subscribe({
      next:(data)=>{
      this.onViewStatusUpdate(id, false);
      this.ngOnInit();
      // window.location.reload(); to refresh the page
      },
      error:(error)=>{
        console.error(error);
      }    
    })
  }
  onFavoriteStatus(id:number){
    this.update.updateFavoriteStatus(id, this.isFavorite).subscribe({
      next:(data)=> {
        this.ngOnInit();

      },
      error:(error)=> {
        console.error(error);
      }
    })
  }
  onUnfavorite(id:number){

    this.onFavoriteStatus(id);


  }
  //when favorite start click move the email to the favorite list 
  // onViewClickHandler(id:number){
  //   this.onViewStatusUpdate(id, true);
  //   this.router.navigate(['/contact/detail/' + id]);        

  // }
  onViewStatusUpdate(id:number, isViewed:boolean){
    this.update.updateContactByViewStatus(id, isViewed).subscribe({
      next:(data)=>{
      },
     error:(error)=>{
      console.error(error);
     }
           
    })
  }
  onClickView(id:number){
    this.onViewStatusUpdate(id, true);
    this.router.navigate(['/contact/detail/' + id]);        
  }
  // getAllContactByDeleteStatusAndKeyword(isDeleted:boolean,keyword:string, pageNumber:number, pageSize:number){
  //   this.view.getAllContactByisDeleteStatusAndKeyword(isDeleted,keyword,pageNumber,pageSize).subscribe({
  //     next:(data)=>{     
  //       this.contacts= data['content'];
  //       this.length=data['totalElements'];        
  //     },
  //     error:(error)=>{
  //       console.error(error);
  //     }
  //   })
  // }
  getAllContactByDeleteStatusAndKeyword(isTrash:boolean,keyword:string, pageNumber:number, pageSize:number){
    this.view.getAllContactByisDeleteStatusAndKeyword(isTrash,keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        this.contacts= data['content'];
        this.length=data['totalElements'];
        
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

}



