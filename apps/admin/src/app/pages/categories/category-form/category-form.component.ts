import { CategoriesService, Category } from '@angular-unicorn/products';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  providers: [MessageService]
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  header!: string;
  subheader!: string;
  categoryId: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    public location: Location,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        icon: ['', Validators.required],
        color: ['#fff']
      });

      this._checkEditMode();
  }

  onSubmit(): void {
    const category = {
      name: this.controls['name'].value,
      icon: this.controls['icon'].value,
      color: this.controls['color'].value
    }
    if(this.editMode){
      this._editCategory(category);
    }else{
      this._createCategory(category);
    }
  }

  private _editCategory(category:Category): void {
    this.isSubmitted = true;
    if(this.form.invalid){
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Please fill required filled.' });
      return;
    }
    
    this.categoryId && this.categoriesService.updateCategory(this.categoryId, category)
    .subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      })
    },
    (error)=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not updated.' });
    });
  }

  private _createCategory(category:Category){
    this.isSubmitted = true;
    if(this.form.invalid){
      this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Please fill required filled.' });
      return;
    }
    this.categoriesService.createCategory(category)
    .subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Added' });
      timer(2000).toPromise().then(done => {
        this.location.back();
      })
    },
    (error)=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Not Added' });
    });
  }

  get controls(){
    return this.form.controls;
  }

  private _checkEditMode(){
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      if(this.categoryId){
        this.editMode = true;
        this.header = 'Edit Category';
        this.subheader = 'Edit the category details';
        this.categoriesService.getCategory(params['id']).subscribe(res => {
          this.controls['name'].setValue(res.name);
          this.controls['icon'].setValue(res.icon);
          this.controls['color'].setValue(res.color);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong.' });
        })
      }else{
        this.header = 'Add Category';
        this.subheader = 'Create a new category';
      }
    })
  }

}
