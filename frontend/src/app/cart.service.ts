import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  itemsSource = new BehaviorSubject([]);
  currentItems = this.itemsSource.asObservable();
  cartItems: any = [];

  addItem(newCartItem: any): void {
    const prevCartItem = this.cartItems.find(
      (el: any) => el.product._id == newCartItem.product._id
    );

    if (prevCartItem) {
      // update item qty
      this.cartItems = this.cartItems.map((item: any) => {
        if (item.product._id == prevCartItem.product._id) {
          item.qty = item.qty + 1;
        }
        return item;
      });
    } else {
      this.cartItems.push(newCartItem);
    }

    this.itemsSource.next(this.cartItems);
  }

  updateItem(items: any): void {
    this.cartItems = items;
    this.itemsSource.next(this.cartItems);
  }
}
