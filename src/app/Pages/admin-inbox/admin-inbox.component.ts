import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { DeleteBackendService } from 'src/app/services/delete-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css']
})
export class AdminInboxComponent implements OnInit{
  contacts: Contact[] =[];
  pageNumber:number=0;
  pageSize:number=5;
  isDeleted:boolean=false;
  deleteStatus:boolean = true;
  keyword:string= "";
  countTrash:number=0;
  countInbox:number=0;
  isViewed:boolean=false
  length = 5;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent;
  isTrash:boolean = true;

  constructor(private view:ViewBackendService, private deleteService:DeleteBackendService, private router:Router){}

  ngOnInit(): void {
    // this.getAllContactByDeleteStatus(this.isDeleted, this.pageNumber, this.pageSize);
    this.getAllContactByDeleteStatusAndKeyword(this.isDeleted,this.keyword,this.pageNumber, this.pageSize);
    this.countTotalEmail();
    this. countTotalTrashEmail();   
  }

  // getAllContactByDeleteStatus(isDeleted:boolean, pageNumber:number, pageSize:number){
  //   this.view.getAllContactByDeleteStatus(isDeleted,pageNumber,pageSize).subscribe({
  //     next:(data)=>{
  //       this.contacts= data['content'];
  //     },
  //     error:(error)=>{
  //       console.error(error);
  //     }
  //   })

  // }
  getAllContactByDeleteStatusAndKeyword(isDeleted:boolean,keyword:string, pageNumber:number, pageSize:number){
    this.view.getAllContactByisDeleteStatusAndKeyword(isDeleted,keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        
        this.contacts= data['content'];
        this.length=data['totalElements'];
        
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  onDeleteStatus(id: number){
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

  onSearch(event:any){
    this.keyword=event.target.value;
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

  onViewClickHandler(id:number){
    this.onViewStatusUpdate(id, true);
    this.router.navigate(['/contact/detail/' + id]);        

  }

  onViewStatusUpdate(id:number, isViewed:boolean){
    this.view.getContactByViewStatus(id, isViewed).subscribe({
      next:(data)=>{
      },
     error:(error)=>{
      console.error(error);
     }
           
    })
  }

  handlePageEvent(event: any) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllContactByDeleteStatusAndKeyword(this.isDeleted,this.keyword,this.pageNumber, this.pageSize);
  }

}
  


