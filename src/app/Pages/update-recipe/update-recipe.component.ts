import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { UnitOfMeasure } from 'src/app/models/unit-of-measure';
import { UpdateBackendService } from 'src/app/services/update-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit{
  pageNumber:number=0;
  pageSize:number=5;
  keyword:string='';
  length:number=0;
  recipe:Recipe = new Recipe();
  categories:Category[]=[];
  ingredient:Ingredient= new Ingredient();
  unitOfMeasures:UnitOfMeasure[]=[];
  unitOfMeasureDetail:UnitOfMeasure= new UnitOfMeasure();
  id:number=0;
  
  diffeculties:string[]=['EASY', 'MODERATE', 'KIND_OF_HARD', 'HARD'];



  constructor(private update:UpdateBackendService,private view:ViewBackendService, private router:Router, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getAllCategories(this.keyword, this.pageNumber, this.pageSize);
    this.id=this.route.snapshot.params['id'];
    this.getRecipeById(this.id);
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
  getRecipeById(id:number){
    this.view.getRecipeById(id).subscribe({
      next:(data)=>{
        this.recipe=data;

      },
      error:(error)=>{
        console.error(error);
      }

    })
  }

  onUpdateSubmit(){
    this.update.updateRecipe(this.recipe).subscribe({
      next:(data)=>{
        this.recipe =data as Recipe;
        this.router.navigate(['/recipe/'+ this.recipe.id +'/detail']);


      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  }

