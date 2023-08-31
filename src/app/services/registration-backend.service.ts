import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';
import { Newsletter } from '../models/newsletter';
import { Recipe } from '../models/recipe';
import { UnitOfMeasure } from '../models/unit-of-measure';

@Injectable({
  providedIn: 'root'
})
export class RegistrationBackendService {
  private userUrl!:string;
  private publicUrl!:string;
  private adminUrl!:string;
  
    constructor(private httpClient:HttpClient) { 
      this.userUrl=environment.baseUserUrl;
      this.publicUrl=environment.basePublicUrl;
      this.adminUrl=environment.baseAdminUrl;
    }
  
    public registorCategory(category:Category):Observable<Object>{
      return this.httpClient.post(this.adminUrl + '/category', category);
    }

    public registorSubscriber(newsletter: Newsletter):Observable<Object>{
      return this.httpClient.post(this.publicUrl + '/newsletter', newsletter);

    }
    public registorUnitOfMeasure(uom: UnitOfMeasure):Observable<Object>{
      return this.httpClient.post(this.adminUrl + '/unitofmeasure',uom);
    }
    public registorRecipe(recipe: Recipe):Observable<Object>{
      return this.httpClient.post(this.userUrl + '/recipe', recipe)
    }
}
