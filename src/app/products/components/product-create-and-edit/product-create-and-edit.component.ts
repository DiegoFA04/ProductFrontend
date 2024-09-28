import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Product} from "../../model/product.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-product-create-and-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './product-create-and-edit.component.html',
  styleUrl: './product-create-and-edit.component.css'
})
export class ProductCreateAndEditComponent {
//#region Attributes

  @Input() product!: Product;
  @Input() editMode: boolean = false;
  @Output() protected productAddRequested = new EventEmitter<Product>();
  @Output() protected productUpdateRequested = new EventEmitter<Product>();
  @Output() protected cancelRequested = new EventEmitter<void>();
  @ViewChild('productForm', { static: false}) protected productForm!: NgForm;

  //#endregion Attributes

  //#region Methods

  constructor() {
    this.product = new Product({});
  }

  private resetEditState() {
    this.product = new Product({});
    this.editMode = false;
    this.productForm.reset();
  }

  private isValid = () => this.productForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  // Event Handlers

  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.productUpdateRequested : this.productAddRequested;
      emitter.emit(this.product);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  //#endregion Methods
}
