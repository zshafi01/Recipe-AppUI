import { Component } from '@angular/core';
import { Payment } from '../models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  payment:Payment= new Payment();
}
