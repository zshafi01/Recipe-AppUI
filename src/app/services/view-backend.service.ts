import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';
import { Recipe } from '../models/recipe';
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
    public getCategoryById(id:number):Observable<Category>{
      return this.httpClient.get<Category>(this.publicUrl + '/category/' + id + '/show')
    }
    public getAllUnitOfMeasurePageable(keyword:string,pageNo:number, pageSize:number): Observable<any>{
      return this.httpClient.get(this.publicUrl + '/unitofmeasures?keyword=' +keyword + "&page="+ pageNo + "&size=" + pageSize)
    }
    publicUnitOfMeasureById(id:number):Observable<UnitOfMeasure>{
      return this.httpClient.get<UnitOfMeasure>(this.publicUrl +'/unitofmeasure/' + id + '/show')
    }
}
