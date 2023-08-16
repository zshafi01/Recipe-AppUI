import { Recipe } from "./recipe";
import { UnitOfMeasure } from "./unit-of-measure";

export class Ingredient {
    id!:number;
    name!:string;
    description!:string;
    amount!:number;
    recipe!:Recipe;
    unitOfMeasure!:UnitOfMeasure;
    
}
