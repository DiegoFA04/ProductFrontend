import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../model/product.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ProductService} from "../../services/product.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {
  ProductCreateAndEditComponent
} from "../../components/product-create-and-edit/product-create-and-edit.component";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    ProductCreateAndEditComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatRow,
    MatPaginator
  ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  protected productData!: Product;
  protected columnsToDisplay: string[] = ['id', 'name', 'price', 'stock', 'actions'];
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private productService: ProductService = inject(ProductService);

  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.productData = new Product({});
    this.dataSource = new MatTableDataSource();
    console.log(this.productData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.getAllProducts();
  }

  protected onEditItem(item: Product) {
    this.editMode = true;
    this.productData = item;
  }

  protected onDeleteItem(item: Product) {
    this.deleteProduct(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllProducts();
  }

  protected onProductAddRequested(item: Product) {
    this.productData = item;
    this.createProduct();
    this.resetEditState()
  }

  protected onProductUpdateRequested(item: Product) {
    this.productData = item;
    this.updateProduct();
    this.resetEditState();
  }

  private resetEditState(): void {
    this.productData = new Product({});
    this.editMode = false;
  }

  private getAllProducts() {
    this.productService.getAll().subscribe((response: Array<Product>) => this.dataSource.data = response);
  }

  private createProduct() {
    this.productService.create(this.productData).subscribe((response: Product) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateProduct() {
    let productToUpdate = this.productData;
    this.productService.update(productToUpdate.id, productToUpdate).subscribe((response: Product) => {
      let index = this.dataSource.data.findIndex((product: Product) => product.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((product: Product) => product.id != id);
    });
  }

}
