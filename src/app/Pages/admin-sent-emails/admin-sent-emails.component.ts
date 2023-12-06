import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Reply } from 'src/app/models/reply';
import { SentEmails } from 'src/app/models/sent-emails';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-sent-emails',
  templateUrl: './admin-sent-emails.component.html',
  styleUrls: ['./admin-sent-emails.component.css','./admin-sent-emails-one.component.css','./admin-sent-emails-two.component.css','./admin-sent-emails-three.component.css']
})
export class AdminSentEmailsComponent implements OnInit{
  id!:number;
  countTrash:number=0;
  countInbox:number=0;
  countAll:number =0;
  countFavorite:number =0;
  isViewed:boolean= false;
  isTrash:boolean = true;
  isFavorite:boolean = true;
  isDeleted:boolean=false;
  pageNumber:number=0;
  pageSize:number=6;
  keyword:string='';

  constructor (private view:ViewBackendService,private route:ActivatedRoute){}

  sentEmails:SentEmails[] = []; 


  ngOnInit(): void {
    this.showAllEmailsPageable(this.keyword,this.pageNumber,this.pageSize);
    this.id=this.route.snapshot.params['id'];
    // this.showContactDetailById(this.id);
    this.countTotalEmail();
    this. countTotalTrashEmail();  
    this.countAllEmail();
    this.countAllFavoiteEmail(true);

  }

  showAllEmailsPageable(keyword:string, pageNumber: number,pageSize: number){
    this.view.getAllSentEmailsPageable(keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        this.sentEmails =data['content'];
        console.log(this.sentEmails);
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
  onSearch(event:any){
    this.keyword = event.target.value;
    this.showAllEmailsPageable(this.keyword,this.pageNumber,this.pageSize);

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

}



