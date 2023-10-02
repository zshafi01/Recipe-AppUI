import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { finalize, map, Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { UnitOfMeasure } from 'src/app/models/unit-of-measure';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  pageNumber:number=0;
  pageSize:number=5;
  keyword:string='';
  length:number=0;
  recipe:Recipe = new Recipe();
  categories:Category[]=[];
  ingredient:Ingredient= new Ingredient();
  unitOfMeasures:UnitOfMeasure[]=[];
  unitOfMeasureDetail:UnitOfMeasure= new UnitOfMeasure();  
  diffeculties:string[]=['EASY', 'MODERATE', 'KIND_OF_HARD', 'HARD'];
  title = 'angular-firebase';
  percentage:Observable<number|undefined>;
  uploadTask:AngularFireUploadTask;
  snapshot:Observable<any>;
  downloadUrl:Observable<string>;
  isComplated:Observable<boolean>;
  file!:File;
  fileName:string;
  fileSize:number =0;
  // thumnail:string= '';

  
  constructor(private registor:RegistrationBackendService, private view:ViewBackendService, private router:Router, private fireStorage:AngularFireStorage){}

  
  ngOnInit(): void {
    this.getAllCategories(this.keyword, this.pageNumber, this.pageSize);
    this.getAllUnitOfMeasures(this.keyword, this.pageNumber, this.pageSize);
  }

  getAllCategories(keyword:string, pageNumber:number, pageSize:number){
    this.view.getAllCategoriesPageable(keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        this.categories =data['content'];
        this.length=data['totalElements'];
       console.log(this.categories);
      },
      error:(error)=>{
        console.error(error);
      }
    })
    }
  getAllUnitOfMeasures(keyword:string,pageNumber:number,pageSize:number){
    this.view.getAllUnitOfMeasurePageable(keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        this.unitOfMeasures = data['content'];
        console.log(data);

      },
      error:(error)=>{
        console.error(error);
      }
          })
  }

  getUnitOfMeasureById(id:number){
    this.view.getUnitOfMeasureById(id).subscribe({
      next:(data)=>{
        this.unitOfMeasureDetail=data;
        console.log(data);
      },
      error:(error)=>{
        console.error(error)
      }
    })
  
  }
  onSubmit(){
    this.registor.registorRecipe(this.recipe).subscribe({
      next:(data)=>{
        this.recipe =data as Recipe;
        this.router.navigate(['/recipe/'+ this.recipe.id +'/detail']);


      },
      error:(error)=>{
        console.error(error);
      }
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
          this.recipe.thumbnail = url;
        })
        
        
      }
      )
      // this.snapshot = this.uploadTask.snapshotChanges().pipe(
      //   finalize(async()=>{
      //     const url= await ref.getDownloadURL().toPromise();
      //     console.log(url);
      //     this.recipe.thumbnail =url;
      //   }
      //   )
      // )
      
      // const url=  this.uploadTask.ref.getDownloadURL();
      // console.log(url);
      // this.recipe.thumbnail = url;
    }
    
  }
}

