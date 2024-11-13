import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  searchText: string = '';
  cartCount: number = 0;
  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.currentItems.subscribe((items) => {
      this.cartCount = items.length;
    });
  }

  search(): void {
    this.apiService.searchProducts(this.searchText);
  }

  //clear the search
  clearSearch(): void {
    if (this.searchText == '') {
      this.search();
    }
  }
}
