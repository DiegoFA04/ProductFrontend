import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Product} from "../model/product.entity";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor() {
    super();
    this.resourceEndpoint = '/products';
  }
}
