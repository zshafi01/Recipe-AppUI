import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { RecipeResponse } from '../models/recipe-response';
import { UnitOfMeasure } from '../models/unit-of-measure';

@Injectable({
  providedIn: 'root'
})
export class UpdateBackendService {
  private userUrl!:string;
  private publicUrl!:string;
  private adminUrl!:string;
  
    constructor(private httpClient:HttpClient) { 
      this.userUrl=environment.baseUserUrl;
      this.publicUrl=environment.basePublicUrl;
      this.adminUrl=environment.baseAdminUrl;
    }

    public updateCategory(category:Category):Observable<Object>{
      return this.httpClient.post(this.adminUrl + '/category', category);
    }
    public updateRecipe(recipe:RecipeResponse):Observable<Object>{
      return this.httpClient.post(this.userUrl + '/recipe', recipe);
    }
    public updateUnitOfMeasure(uom:UnitOfMeasure):Observable<Object>{
      return this.httpClient.post(this.adminUrl + '/unitofmeasure', uom);
    }
    public updateIngredient(ingredient:Ingredient):Observable<Object>{
      return this.httpClient.post(this.userUrl + '/ingredient', ingredient);
    }
    public updateContactByViewStatus(id:number, isViewed:boolean):Observable<number>{
      return this.httpClient.get<number>(this.adminUrl + '/view/' + id +"?isViewed=" +isViewed)
    }
    public updateFavoriteStatus(id:number, isFavorite:boolean):Observable<number>{
      return this.httpClient.get<number>(this.adminUrl + '/favorite-status/' + id + "?isFavorite=" + isFavorite)
    }
 
}
