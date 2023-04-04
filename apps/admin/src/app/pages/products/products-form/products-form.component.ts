import { ProductsService, CategoriesService, Product, Category } from '@angular-unicorn/products';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: []
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form!: FormGroup;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer = ' ';
  currentProductId = '';

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentProductId = params['id'];
        this.productsService.getProduct(params['id']).subscribe((product) => {
          this.controls['name'].setValue(product.name);
          if(product.category)
            this.controls['category'].setValue(product.category._id);
          this.controls['brand'].setValue(product.brand);
          this.controls['price'].setValue(product.price);
          this.controls['countInStock'].setValue(product.countInStock);
          this.controls['isFeatured'].setValue(product.isFeatured);
          this.controls['description'].setValue(product.description);
          this.controls['richDescription'].setValue(product.richDescription);
          if(product.image)
            this.imageDisplay = product.image;
          this.controls['image'].setValidators([]);
          this.controls['image'].updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    
    const productFormData:FormData = new FormData();
    Object.keys(this.controls).map((key) => {
      productFormData['append'](key, this.controls[key].value);
    });

    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  // onCancle() {}

  onImageUpload(event:any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      const imageControl = this.form.get('image');

      if (imageControl) {
        imageControl.updateValueAndValidity();
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        if(fileReader.result)
          this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get controls() {
    return this.form?.controls;
  }
}
