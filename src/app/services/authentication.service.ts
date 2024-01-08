import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthModelResponse } from '../models/auth-model-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthModelRequest } from '../models/auth-model-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private publicUrl!:string;
  private userSubject: BehaviorSubject<AuthModelResponse>;
  public user: Observable<AuthModelResponse>;

  constructor(private httpClient:HttpClient) {
    this.publicUrl = environment.basePublicUrl;
  
    this.userSubject = new BehaviorSubject<AuthModelResponse>(JSON.parse(localStorage.getItem('user')));
   
      if (this.userSubject) {
        this.user = this.userSubject.asObservable();
      }
   }

   public authentication(authModelRequest:AuthModelRequest):Observable<AuthModelResponse>{
    return this.httpClient.post<AuthModelResponse>(this.publicUrl + '/authenticate', authModelRequest);
  }

  public get userValue(): AuthModelResponse {
    return this.userSubject.value;
  }
  public set userValue(authUser: AuthModelResponse) {
    this.userSubject.next(authUser);
  }

  public removeSession(){
    this.userSubject.next(null);
    localStorage.removeItem('user');
    localStorage.clear();
    window.localStorage.clear();
  }
  public isSessionExpired(){

const currentTime = new Date().getTime();
const expireTime = this.userValue?.tokenExpireTime?Number(this.userValue.tokenExpireTime):0;
return currentTime > expireTime;


  }
}
