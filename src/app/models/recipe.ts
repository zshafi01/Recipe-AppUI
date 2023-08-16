import { Ingredient } from "./ingredient";

export class Recipe {
    id!:number;
    title!:string;
    description!:string;
    prepTime!:string;
    cookTime!:string;
    source!:string;
    tumbnail!:string;
    difficulty!:string;
    ingredientSet!: Ingredient[];
    category!:number;
}
