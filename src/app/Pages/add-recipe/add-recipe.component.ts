import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { UnitOfMeasure } from 'src/app/models/unit-of-measure';
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
  ingredient:Ingredient= new Ingredient();
  unitOfMeasures:UnitOfMeasure[]=[];
  unitOfMeasureDetail:UnitOfMeasure= new UnitOfMeasure();
  
  diffeculties:string[]=['EASY', 'MODERATE', 'KIND_OF_HARD', 'HARD'];

  @ViewChild('myModalClose') modalClose;
  
  constructor(private registor:RegistrationBackendService, private view:ViewBackendService, private router:Router){}

  
  ngOnInit(): void {
    this.getAllCategories(this.keyword, this.pageNumber, this.pageSize);
    this.getAllUnitOfMeasures(this.keyword, this.pageNumber, this.pageSize);
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
  getAllUnitOfMeasures(keyword:string,pageNumber:number,pageSize:number){
    this.view.getAllUnitOfMeasurePageable(keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        this.unitOfMeasures = data['content'];
        console.log(data);

      },
      error:(error)=>{
        console.error(error);
      }
      
    })
  }
  onIngrediantAdd(){
    console.log(this.ingredient);
    console.log('==========================================');
    // this.getUnitOfMeasureById(this.ingredient.unitOfMeasure.id);
    // this.recipe.ingredientSet.push({id:null,name:this.ingredient.name,description:this.ingredient.description,amount:this.ingredient.amount}); 
        this.recipe.ingredientSet.push(this.ingredient);
        this.modalClose.nativeElement.click(); 

    // , unitOfMeasure:this.unitOfMeasureDetail
    console.log(this.recipe.ingredientSet.length);
  }
  getUnitOfMeasureById(id:number){
    this.view.publicUnitOfMeasureById(id).subscribe({
      next:(data)=>{
        this.unitOfMeasureDetail=data;
        console.log(data);
      },
      error:(error)=>{
        console.error(error)
      }
    })
  
  }
  onSubmit(){
    this.registor.registorRecipe(this.recipe).subscribe({
      next:(data)=>{
        this.recipe =data as Recipe;
        this.router.navigate(['/home']);


      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

}
