import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/Services/products.service';
import { Product } from '../../core/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TranslateModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
   
   private readonly _ProductsService = inject(ProductsService);
   private readonly _ActivatedRoute = inject(ActivatedRoute);
   images : string[] = [];
   private id : string | null = "";
  product? : Product;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 1,
    autoplay: true,
    autoplayTimeout: 1, // Minimal timeout for continuous movement
    autoplayHoverPause: false, // Don't pause on hover
    smartSpeed: 300, // Adjust to control the smoothness
    rtl : true,
    dots: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  //  getProduct() {
  //   this._ProductsService.getProduct(this.id || "").subscribe({
  //     next : (res) => {
  //       this.product = res.data;
  //       this.images = res.data.images;
  //     }
  //   })
  //  }
   ngOnInit(): void {
    console.log(this._ActivatedRoute.paramMap.subscribe({
      next : (pram) => {
       this.id =  pram.get('id');
      },
      error : (err) => {
        console.log(err);
      }
    }));
    //this.getProduct();
  }
   
}
