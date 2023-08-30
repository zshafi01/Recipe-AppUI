import { Component, OnInit } from '@angular/core';
import { UnitOfMeasure } from 'src/app/models/unit-of-measure';
import { DeleteBackendService } from 'src/app/services/delete-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-unit-of-measures',
  templateUrl: './unit-of-measures.component.html',
  styleUrls: ['./unit-of-measures.component.css']
})
export class UnitOfMeasuresComponent implements OnInit {
  pageNumber:number=0;
  pageSize:number=6;
  keyword:string='';
  length:number=0;
  unitofmesures:UnitOfMeasure[]=[];


  constructor (private view:ViewBackendService, private deleteService:DeleteBackendService){}


  ngOnInit(): void {
    this.getAllUnitOfMeasures(this.keyword, this.pageNumber, this.pageSize);
  }

  getAllUnitOfMeasures(keyword:string,pageNumber:number,pageSize:number){
    this.view.getAllUnitOfMeasurePageable(keyword,pageNumber,pageSize).subscribe({
      next:(data)=>{
        this.unitofmesures = data['content'];
        console.log(data);

      },
      error:(error)=>{
        console.error(error);
      }
      
    })
  }

  onDelete(id:number){
    this.deleteService.deleteUnitOfMeasureById(id).subscribe(data=>{
      console.log("has been deleted")
      this.ngOnInit();
    })

}
}
