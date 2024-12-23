import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../core/Services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
private readonly _FormBuilder = inject(FormBuilder);
private readonly _OrdersService = inject(OrdersService);
private readonly _ActivatedRoute = inject(ActivatedRoute);
private cartId? : string;
address : FormGroup = this._FormBuilder.group({
  details : [null],
  phone : [null],
  city : [null]
})

payment = () => {
  console.log(this.cartId);
   this._OrdersService.getCheckOutSession(this.cartId!,this.address.value).subscribe({
    next : (res) => {
       console.log(res);
       window.location.href = res.session.url;
    },
    error : (err) => {
      console.log(err);
    }
   })
}
ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
     next : (prams) => {
       this.cartId = prams.get('id') || "";
     },
     error : (err) => {
     }
   });
}
}
