import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  id!:number;
  categoryDetail:Category = new Category()

  constructor (private view:ViewBackendService,private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.showCategoryDetailById(this.id);
  }

  showCategoryDetailById(id: number){
    this.view.getCategoryById(id).subscribe({
      next:(data)=>{
        this.categoryDetail=data;
        console.log(data);
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

}
