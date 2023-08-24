import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit {

constructor(private registory:RegistrationBackendService, private router:Router){}


  ngOnInit(): void {

  }
  category:Category = new Category();
  onSubmit(){
    this.registory.registorCategory(this.category).subscribe({
      next:(data)=>{
        this.router.navigate(['/categories'])

      },
      error:(error)=>{
        console.error(error)
      },
      complete:()=>{}

    })
    

  }
  


}
