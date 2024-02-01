import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductCategory } from '../product-categories/product-category';
import { ProductService } from './product.service';
import { EMPTY, Observable, catchError, of } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  productsWithCategory$ = this.productService.productsWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
