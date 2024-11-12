import { ApiService } from './../api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data.products;
    });
  }
}
