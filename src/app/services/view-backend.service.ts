import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Recipe } from '../models/recipe';

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
}
