import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Newsletter } from 'src/app/models/newsletter';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  pageNumber:number=0;
  pageSize:number=5;
  keyword:string='';
  length:number=0;
  successAlert:boolean=false;
  dangerAlert:boolean=false;

  constructor(private registor:RegistrationBackendService, private view:ViewBackendService){}

  newsletter: Newsletter= new Newsletter();
  categories:Category[]=[];

  ngOnInit(): void {
    this.getAllCategories(this.keyword, this.pageNumber, this.pageSize)
  }


  onSubliscibtion(){
    this.registor.registorSubscriber(this.newsletter).subscribe({
      next:(data)=>{
        // console.log("success");
        this.successAlert = true;
        this.dangerAlert=false;
        this.reset();
      },
      error:(error)=> {
        console.error(error)
      this.dangerAlert= true;
      this.successAlert=false;
      }

    })
  } 
  private getAllCategories(keyword:string, pageNumber:number, pageSize:number){
    this.view.getAllCategoriesPageable(keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
      this.categories=data['content'];
      this.length=data['totalElements'];
      console.log(this.categories);

      },
      error:(error)=>{
        console.error
      }
      
    })

  }
  reset(){
    (<HTMLInputElement>document.getElementById('email')).value = "";
  }

}
