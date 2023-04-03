import { ProductsService, Product } from '@angular-unicorn/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products:Product[] = []
  constructor(
    private productsService: ProductsService
  ){}

  ngOnInit():void {
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    })
  }
}
