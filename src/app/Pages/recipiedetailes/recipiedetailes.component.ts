import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { UpdateBackendService } from 'src/app/services/update-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-recipiedetailes',
  templateUrl: './recipiedetailes.component.html',
  styleUrls: ['./recipiedetailes.component.css']
})
export class RecipiedetailesComponent implements OnInit {
  recipe:Recipe = new Recipe();
  id:number = 0;
  @ViewChild('myModalClose') modalClose;
  @ViewChild('myModalOpen') modalOpen;

  constructor (private view:ViewBackendService, private update:UpdateBackendService, private route:ActivatedRoute){}

  
  ngOnInit(): void {
this.id= this.route.snapshot.params['id'];
this.getRecipeById(this.id);
    
  }
  ingredient:Ingredient= new Ingredient();


  onIngrediantAdd(){
    this.recipe.ingredientSet.push(this.ingredient);
    this.update.updateRecipe(this.recipe).subscribe({
      next:(data)=>{
        this.modalClose.nativeElement.click(); 
        this. reloadPage();
      },
      error:(error)=>{
        console.error(error);
      }
            
    });
    

     }
  getRecipeById(id:number){
    this.view.getRecipeById(id).subscribe({
      next:(data)=>{
        this.recipe =data;
      },
      error:(error)=>{
        console.error(error);
      }         
    })
  }
 reloadPage(){
    window.location.reload()
  }
  updateIngredient(id){
    this.getRecipeIngredientById(id);
    this.modalOpen.nativeElement.click(); 


  }
  getRecipeIngredientById(id:number){
    this.view.getIngredientById(id).subscribe({
      next:(data)=>{
        this.ingredient = data;
      },
      error:(error)=>{
        console.error(error);
      }
    })
    

  }
  onDelete(id){}
}
