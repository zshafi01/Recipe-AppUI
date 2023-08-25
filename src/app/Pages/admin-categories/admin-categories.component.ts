import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { DeleteBackendService } from 'src/app/services/delete-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  pageNumber:number=0;
  pageSize:number=6;
  keyword:string='';
  length:number=0;
  document: any;

  constructor(private registory:ViewBackendService, private deleteService:DeleteBackendService){}
  categories:Category[]=[];

  ngOnInit(): void {
    this.getAllCategoriesPageable(this.keyword,this.pageNumber, this.pageSize)
  }

  getAllCategoriesPageable(keyword:string,pageNumber:number,pageSize:number){
  this.registory.getAllCategoriesPageable(keyword,pageNumber,pageSize).subscribe({
    next:(data)=>{
      this.categories=data['content'];
      this.length=data['totalElements'];
      console.log(this.categories);

      
    },
    error:(error)=>{
      console.error(error);
    }
  })

}
onSearchChange(searchValue:any):void{
  this.keyword = searchValue.target.value;
  this.getAllCategoriesPageable(this.keyword, this.pageNumber, this.pageSize);
  
}
onSubmit(){
  this.keyword = (<HTMLInputElement>this.document.getElementById('keyword')).value;
  this.getAllCategoriesPageable(this.keyword, this.pageNumber, this.pageSize);


}
onDelete(id:number){
  this.deleteService.deleteCategoryById(id).subscribe(data=>{
    console.log("has been deleted")
    this.ngOnInit();
  })

}
  }


