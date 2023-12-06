import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  percentage:Observable<number|undefined>;
  uploadTask:AngularFireUploadTask;
  snapshot:Observable<any>;
  downloadUrl:Observable<string>;
  isComplated:Observable<boolean>;
  file!:File;
  fileName:string;
  fileSize:number =0;
 
  user:User = new User();

constructor(private save:RegistrationBackendService, private router:Router,  private fireStorage:AngularFireStorage){}

  ngOnInit(): void {
  }
  onSubmit() { this.save.registorUser(this.user).subscribe({
    next:(data)=>{
      this.router.navigate(['/signin'])

    },
    error:(error)=>{
      console.error(error)
    },
    complete:()=>{}

  })



}

onFileChange(event:any){
  this.file= event.target.files[0];
    if (this.file){
    console.log(this.file);
    this.fileName = this.file.name;
    this.fileSize= Math.round(this.file.size / 1048576);
    const currentYear = new Date().getFullYear();
    // const dateTime = new Date();
    const path= `recipe-images/${currentYear}/${this.file.name}`;
    const ref=this.fireStorage.ref(path);
    this.uploadTask = this.fireStorage.upload(path, this.file);
    this.percentage = this.uploadTask.percentageChanges();
    this.isComplated =this.percentage.pipe(map(percentage=>percentage === 100))
    this.uploadTask.then(()=>{
      this.downloadUrl= ref.getDownloadURL();
      this.downloadUrl.subscribe(url=> {
        console.log("downloadUrl:", url);
        this.user.profilePic = url;
      })
      
      
    }
    )
  }
}
}
