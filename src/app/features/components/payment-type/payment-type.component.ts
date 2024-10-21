import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { paymentType } from '../../../../assets/enums/generalEnums';

@Component({
  selector: 'app-payment-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-type.component.html',
  styleUrl: './payment-type.component.scss'
})
export class PaymentTypeComponent implements OnInit {

  @Input() type = "";

  isCard = false;
  isCash = false;
  isCardDelivery = false;

  constructor() {

  }

  ngOnInit(): void {
    this.asingTypes();
  }

  asingTypes() {
    if (this.type == paymentType.card) {
      this.isCard = true;
    }
    if (this.type == paymentType.cash) {
      this.isCash = true;
    }
    if (this.type == paymentType.cardDelivery) {
      this.isCardDelivery = true;
    }
  }

}
