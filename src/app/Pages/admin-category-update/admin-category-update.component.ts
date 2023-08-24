import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { UpdateBackendService } from 'src/app/services/update-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css']
})
export class AdminCategoryUpdateComponent implements OnInit{
  id:number = 0;
  category:Category= new Category();
  
  constructor(private updateService:UpdateBackendService, private route:ActivatedRoute, private viewBackend:ViewBackendService, private router:Router){}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCategoryDetailById(this.id);
  }

  getCategoryDetailById(id:number){
    this.viewBackend.getCategoryById(id).subscribe({
      next:(data)=>{
        this.category = data;
      },
      error:(error)=> {console.error(error)}

    })
  }
  onUpdateSubmit(){
    this.updateService.updateCategory(this.category).subscribe({
      next:(data)=>{
        this.router.navigate(['/categories'])
      },
      error:(error)=> {console.error(error)}

    })

    

  }



}
