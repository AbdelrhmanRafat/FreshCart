import { Component, inject, OnInit } from '@angular/core';
import { Brand } from '../../core/interfaces/product';
import { BrandsService } from '../../core/Services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  
  brands : Brand[] = [];
  private _BrandsService = inject(BrandsService);
  getBrands = () => {
   this._BrandsService.getBrands().subscribe({
    next : (res) => {
    this.brands = res.data;
    },
    error : (err) => {

    }
   })
  }

  ngOnInit(): void {
    this.getBrands();
  }

}
