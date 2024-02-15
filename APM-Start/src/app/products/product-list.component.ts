import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductCategory } from '../product-categories/product-category';
import { ProductService } from './product.service';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, filter, map, of, startWith } from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories$ = this.productCategoryService.productCategories$;

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$
  ]).pipe(
    map(([products, selectedCategoryId]) => 
      products.filter(product => 
        selectedCategoryId 
        ? product.categoryId === selectedCategoryId 
        : true
      ))
  );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
  ) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
