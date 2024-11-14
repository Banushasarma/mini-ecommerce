import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  product: any = null;
  qty: number = 1;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.apiService.getSingleProduct(this.productId).subscribe((data) => {
        this.product = data.product;
      });
    });
  }

  increaseQuantity(): void {
    if (this.qty < this.product.stock) this.qty++;
  }
  decreaseQuantity(): void {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  addToCart(): void {
    if (this.product.stock == 0) {
      this.toastr.error('Product out of stock', 'MiniECommerce');
      return;
    }
    const newCartItem = {
      product: this.product,
      qty: this.qty,
    };

    // Add newCartItem to the cart
    this.cartService.addItem(newCartItem);
    this.toastr.success('Product added to cart', 'MiniECommerce');
  }
}
