import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';
import { Contact } from '../models/contact';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { RecipeResponse } from '../models/recipe-response';
import { UnitOfMeasure } from '../models/unit-of-measure';

@Injectable({
  providedIn: 'root'
})
export class ViewBackendService   {
  private userUrl!:string;
  private publicUrl!:string;
  private adminUrl!:string;
  
    constructor(private httpClient:HttpClient) { 
      this.userUrl=environment.baseUserUrl;
      this.publicUrl=environment.basePublicUrl;
      this.adminUrl=environment.baseAdminUrl;
    }

    public getAllRecipesPageable(keyword:string, pageNo:number,pageSize:number): Observable<any>{
      return this.httpClient.get(this.publicUrl + '/recipes?keyword='+ keyword + "&page="+ pageNo + "&size=" + pageSize)
    
    }
    
    public getAllCategoriesPageable(keyword:string, pageNo:number,pageSize:number): Observable<any>{
      return this.httpClient.get(this.publicUrl + '/categories?keyword='+ keyword + "&page="+ pageNo + "&size=" + pageSize)
    
    }
    public getRecipeById(id:number):Observable<RecipeResponse>{
      return this.httpClient.get<RecipeResponse>(this.publicUrl + '/recipe/' + id + '/show')
    }
    public getCategoryById(id:number):Observable<Category>{
      return this.httpClient.get<Category>(this.publicUrl + '/category/' + id + '/show')
    }
    public getIngredientById(id:number):Observable<Ingredient>{
      return this.httpClient.get<Ingredient>(this.userUrl + '/ingredient/' + id + '/show')
    }
    public getAllUnitOfMeasurePageable(keyword:string,pageNo:number, pageSize:number): Observable<any>{
      return this.httpClient.get(this.publicUrl + '/unitofmeasures?keyword=' +keyword + "&page="+ pageNo + "&size=" + pageSize)
    }
    public getUnitOfMeasureById(id:number):Observable<UnitOfMeasure>{
      return this.httpClient.get<UnitOfMeasure>(this.publicUrl +'/unitofmeasure/' + id + '/show')
    }
    public getAllContactByDeleteStatus(isDeleted:boolean, pageNo:number, pageSize:number): Observable<Contact>{
      return this.httpClient.get<Contact>(this.adminUrl + '/inbox?isDeleted=' +isDeleted + "&page="+ pageNo + "&size=" + pageSize)
    }
    public getAllContactByisDeleteStatusAndKeyword(isDeleted:boolean,keyword:string, pageNo:number, pageSize:number): Observable<any>{
      return this.httpClient.get(this.adminUrl + '/contacts?isDeleted=' +isDeleted +"&keyword=" +keyword + "&page="+ pageNo + "&size=" + pageSize)
    }
    public getContactById(id:number):Observable<Contact>{
      return this.httpClient.get<Contact>(this.adminUrl + '/contact/' + id + '/show')
    }
    public getCountTotalEmail(isDeleted:boolean):Observable<number>{
      return this.httpClient.get<number>(this.adminUrl + '/count-email?isDeleted=' +isDeleted)
    }
    
}
