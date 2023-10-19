import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitOfMeasure } from 'src/app/models/unit-of-measure';
import { RegistrationBackendService } from 'src/app/services/registration-backend.service';

@Component({
  selector: 'app-add-unit-of-measure',
  templateUrl: './add-unit-of-measure.component.html',
  styleUrls: ['./add-unit-of-measure.component.css']
})
export class AddUnitOfMeasureComponent implements OnInit {

  constructor(private registor:RegistrationBackendService, private router:Router){}

  uom:UnitOfMeasure = new UnitOfMeasure();

  ngOnInit(): void {
  }

  onSubmit(){
    this.registor.registorUnitOfMeasure(this.uom).subscribe({
      next:(data)=>{
        this.router.navigate(['/unitofmeasures']);

      },
      error:(error)=>{
        console.error(error);
      }
    })
  }



}
