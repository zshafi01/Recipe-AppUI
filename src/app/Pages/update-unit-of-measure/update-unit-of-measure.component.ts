import { Component, OnInit } from '@angular/core';
import { UnitOfMeasure } from 'src/app/models/unit-of-measure';
import { UpdateBackendService } from 'src/app/services/update-backend.service';

@Component({
  selector: 'app-update-unit-of-measure',
  templateUrl: './update-unit-of-measure.component.html',
  styleUrls: ['./update-unit-of-measure.component.css']
})
export class UpdateUnitOfMeasureComponent implements OnInit {
  uom:UnitOfMeasure=new UnitOfMeasure();

  constructor(private update:UpdateBackendService){}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  updateUnitOfMeasure(uom:UnitOfMeasure){
    this.update.updateUnitOfMeasure(uom).subscribe({
      next:(data)=>{

      },
      error:(error)=>{
        console.error(error);
      }
      
    })
  }

}
