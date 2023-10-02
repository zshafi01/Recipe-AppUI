import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { DeleteBackendService } from 'src/app/services/delete-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-trash',
  templateUrl: './admin-trash.component.html',
  styleUrls: ['./admin-trash.component.css']
})
export class AdminTrashComponent implements OnInit{
  contacts: Contact[] =[];

  pageNumber:number=0;
  pageSize:number=5;
  isDeleted:boolean=false;
  deleteStatus:boolean = true;
  keyword:string= "";
  countTrash:number=0;
  countInbox:number=0;

  length = 5;
  pageSizeOptions = [5, 10, 25];
  isTrash:boolean = true;
  constructor(private view:ViewBackendService, private deleteService:DeleteBackendService){}
  ngOnInit(): void {
    this.getAllContactByDeleteStatusAndKeyword(this.isTrash,this.keyword,this.pageNumber, this.pageSize);
    this.countTotalEmail();
    this. countTotalTrashEmail();
  }

  onSearch(event:any){
    this.keyword=event.target.value;
    this.getAllContactByDeleteStatusAndKeyword(this.isDeleted,this.keyword,this.pageNumber, this.pageSize);


    
  }
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
  countTotalEmail(){
    this.view.getCountTotalEmail(this.isDeleted).subscribe({
      next:(data)=>{
        this.countInbox = data;
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
  countTotalTrashEmail(){
    this.view.getCountTotalEmail(this.isTrash).subscribe({
      next:(data)=>{
        this.countTrash = data;
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }



  handlePageEvent(event: any) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllContactByDeleteStatusAndKeyword(this.isTrash,this.keyword,this.pageNumber, this.pageSize);
  }

}