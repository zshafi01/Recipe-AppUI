import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitOfMeasure } from 'src/app/models/unit-of-measure';
import { UpdateBackendService } from 'src/app/services/update-backend.service';
import { ViewBackendService } from 'src/app/services/view-backend.service';

@Component({
  selector: 'app-update-unit-of-measure',
  templateUrl: './update-unit-of-measure.component.html',
  styleUrls: ['./update-unit-of-measure.component.css']
})
export class UpdateUnitOfMeasureComponent implements OnInit {
  id!:number;
  uom:UnitOfMeasure= new UnitOfMeasure();

  constructor(private update:UpdateBackendService,  private view:ViewBackendService,private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getUnitOfMeasureById(this.id);
  }
  getUnitOfMeasureById(id:number){
    this.view.publicUnitOfMeasureById(id).subscribe({
      next:(data)=>{
      this.uom = data;
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  onUpdateSubmit(){
    this.update.updateUnitOfMeasure(this.uom).subscribe({
      next:(data)=>{
        this.router.navigate(['/unitofmeasures']);

      },
      error:(error)=>{
        console.error(error);
      }
     })
  }
  }
