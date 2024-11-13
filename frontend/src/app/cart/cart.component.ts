import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any = [];

  cartCount: number = 0;
  subTotal: number = 0;
  estTotal: number = 0;

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data: any) => {
      this.cartItems = data;
      console.log(data);
    });
    this.calculateTotal();
  }

  deleteItem(product_id: string) {
    const prevItem: any = this.cartItems.find(
      (item: any) => item.product._id === product_id
    );
    if (prevItem) {
      this.cartItems = this.cartItems.filter(
        (item: any) => item.product._id !== product_id
      );
      this.cartService.updateItem(this.cartItems);
    }

    this.calculateTotal();
  }

  calculateTotal() {
    this.cartCount = this.cartItems.length;
    this.subTotal = this.cartItems.reduce((acc: any, current: any) => {
      return acc + current.qty;
    }, 0);

    this.estTotal = this.cartItems.reduce((acc: any, current: any) => {
      return acc + current.product.price * current.qty;
    }, 0);
  }

  increaseQuantity(product_id: string): void {
    const prevItem: any = this.cartItems.find(
      (item: any) => item.product._id === product_id
    );
    if (prevItem && prevItem.product.stock > prevItem.qty) {
      prevItem.qty++;
      this.cartService.updateItem(this.cartItems);
      this.calculateTotal();
    }
  }
  decreaseQuantity(product_id: string): void {
    const prevItem: any = this.cartItems.find(
      (item: any) => item.product._id === product_id
    );
    if (prevItem && prevItem.qty > 1) {
      prevItem.qty--;
      this.cartService.updateItem(this.cartItems);
      this.calculateTotal();
    }
  }
}
