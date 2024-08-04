import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListPageComponent } from './pages/book-list/book-list-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookListPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
