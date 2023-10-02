import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNumber:number=0;
  pageSize:number=6;
  keyword:string='';
  length:number=0;
  pageSizeOptions = [5, 10, 25];


  constructor(private viewBackend:ViewBackendService){ }
  recipes:Recipe[] =[];

  ngOnInit(): void {
  this.getAllRecipesPagebale(this.keyword,this.pageNumber,this.pageSize)
  }

getAllRecipesPagebale(keyword:string,pageNumber:number,pageSize:number){
  this.viewBackend.getAllRecipesPageable(keyword,pageNumber,pageSize).subscribe({
    next:(data)=>{
      this.recipes=data['content'];
      this.length=data['totalElements'];
      console.log(this.recipes);

      
    },
    error:(error)=>{
      console.error(error);
    }
  })

}
handlePageEvent(event: any) {
  this.pageNumber = event.pageIndex;
  this.pageSize = event.pageSize;
  this.getAllRecipesPagebale(this.keyword,this.pageNumber, this.pageSize);
}



}
