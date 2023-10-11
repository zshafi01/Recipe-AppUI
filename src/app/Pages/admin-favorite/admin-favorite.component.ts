import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { DeleteBackendService } from 'src/app/services/delete-backend.service';
import { UpdateBackendService } from 'src/app/services/update-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-favorite',
  templateUrl: './admin-favorite.component.html',
  styleUrls: ['./admin-favorite.component.css']
})
export class AdminFavoriteComponent implements OnInit{
  contacts: Contact[] =[];

  pageNumber:number=0;
  pageSize:number=5;
  deleteStatus:boolean = true;
  keyword:string= "";
  countTrash:number=0;
  countInbox:number=0;
  countAll:number =0;
  countFavorite:number =0;
  isViewed:boolean= false;
  isTrash:boolean = true;
  isFavorite:boolean = false;
  isDeleted:boolean=false;
  length = 5;
  pageSizeOptions = [5, 10, 25];
  
  constructor(private view:ViewBackendService, private deleteService:DeleteBackendService,private update:UpdateBackendService, private router:Router){}

  ngOnInit(): void {
    this.getAllContactByFavoriteStatusAndKeyword(true,this.keyword,this.pageNumber, this.pageSize);
    this.countTotalEmail();
    this. countTotalTrashEmail();  
    this.countAllEmail();
    this.countAllFavoiteEmail(true);
  }

  onSearch(event:any){
    this.keyword=event.target.value;
    this.getAllContactByFavoriteStatusAndKeyword(true,this.keyword,this.pageNumber, this.pageSize);
  }

  getAllContactByFavoriteStatusAndKeyword(isFavorite:boolean,keyword:string, pageNumber:number, pageSize:number){
    this.view.getAllContactByisFavoriteStatusAndKeyword(isFavorite,keyword,pageNumber,pageSize).subscribe({
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
    this.update.updateContactByViewStatus(id, isViewed).subscribe({
      next:(data)=>{
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
  onRefresh(){
    this.ngOnInit();
  }

  handlePageEvent(event: any) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllContactByFavoriteStatusAndKeyword(this.isFavorite,this.keyword,this.pageNumber, this.pageSize);
  }

}
