import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class DeleteBackendService {

  private userUrl!:string;
  private publicUrl!:string;
  private adminUrl!:string;
  
    constructor(private httpClient:HttpClient) { 
      this.userUrl=environment.baseUserUrl;
      this.publicUrl=environment.basePublicUrl;
      this.adminUrl=environment.baseAdminUrl;
    }

    public deleteCategoryById(id:number):Observable<Object>{
      return this.httpClient.get(this.adminUrl + '/category/' + id + '/delete' )
    }
    public deleteUnitOfMeasureById(id:number):Observable<Object>{
      return this.httpClient.get(this.adminUrl + '/unitofmeasure/' + id + '/delete')
    }
}
