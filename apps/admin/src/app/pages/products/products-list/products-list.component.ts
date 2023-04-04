import { ProductsService, Product } from '@angular-unicorn/products';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products:Product[] = []
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

  deleteProduct(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(id).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category deleted',
            });
            this._getProducts();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: error.status,
              detail: 'Something went wrong.',
            });
          }
        );
      }
    });
  }

  updateProduct(id: string): void{
    this.router.navigateByUrl(`/products/form/${id}`);
  }
}
