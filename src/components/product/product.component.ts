import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products ?: Observable<Product[]>;

  private readonly BASE_URL = 'http://localhost:3000/products'; // URL de l'API JSON Server
  private http : HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.products = this.http.get<Product[]>(this.BASE_URL);
  }
}

export interface Product{
  price ?: number;
  name ?: string;
  img ?:string;
}
