import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { Reply } from 'src/app/models/reply';
import { SentEmails } from 'src/app/models/sent-emails';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-sent-emails',
  templateUrl: './admin-sent-emails.component.html',
  styleUrls: ['./admin-sent-emails.component.css']
})
export class AdminSentEmailsComponent implements OnInit{
  pageNumber:number=0;
  pageSize:number=6;
  keyword:string='';

  constructor (private view:ViewBackendService){}

  sentEmails:SentEmails[] = []; 


  ngOnInit(): void {
    this.showAllEmailsPageable(this.keyword,this.pageNumber,this.pageSize);

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

}
