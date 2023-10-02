import { Category } from "./category";
import { Ingredient } from "./ingredient";

export class RecipeResponse {
    id!:number;
    title!:string;
    description!:string;
    prepTime!:string;
    cookTime!:string;
    source!:string;
    thumbnail!:string;
    difficulty!:string;
    ingredientSet: Ingredient[]= [];
    categorySet:Category[]=[];
    
}
