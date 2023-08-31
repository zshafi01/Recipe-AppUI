import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Recipe } from 'src/app/models/recipe';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  pageNumber:number=0;
  pageSize:number=5;
  keyword:string='';
  length:number=0;
  recipe:Recipe = new Recipe();
  categories:Category[]=[];
  diffeculties:string[]=['EASY', 'MODERATE', 'KIND_OF_HARD', 'HARD'];
  
  constructor(private registor:RegistrationBackendService, private view:ViewBackendService){}

  
  ngOnInit(): void {
    this.getAllCategories(this.keyword, this.pageNumber, this.pageSize);
  }

  getAllCategories(keyword:string, pageNumber:number, pageSize:number){
    this.view.getAllCategoriesPageable(keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        this.categories =data['content'];
        this.length=data['totalElements'];
       console.log(this.categories);
      },
      error:(error)=>{
        console.error(error);
      }

    })

    
  }
  onSubmit(){
    this.registor.registorRecipe(this.recipe).subscribe({
      next:(data)=>{
        this.recipe =data as Recipe;

      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

}
