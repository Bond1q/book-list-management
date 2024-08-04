import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Book } from '@shared/api-gateway/book/book.model';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  @Input() book!: Book;

  @Output() editBook = new EventEmitter<Book>();
  @Output() removeBook = new EventEmitter<string>();
}
