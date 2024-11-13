import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  searchText: string = '';
  constructor(private apiService: ApiService) {}

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
