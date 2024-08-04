import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  startWith
} from 'rxjs';

import { Book } from '@shared/api-gateway/book/book.model';
import { BookModalComponent } from './components/book-modal/book-modal.component';
import { BookComponent } from './components/book/book.component';
import { BookListService } from './services/book-list.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    BookComponent,
    BookModalComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class BookListPageComponent {
  booksListService = inject(BookListService);
  dialog = inject(MatDialog);

  bookList$ = this.booksListService.bookList$;
  loading$ = this.booksListService.loading$;
  searchForm = new FormControl<string>('', { nonNullable: true });

  filteredBooks$ = combineLatest([
    this.bookList$,
    this.searchForm.valueChanges.pipe(
      startWith(''),
      map((search) => search.toLowerCase())
    ),
  ]).pipe(
    map(([books, search]) => {
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search)
      );
    })
  );

  openBookModal(book?: Book) {
    this.dialog.open(BookModalComponent, {
      data: book,
      width: '700px',
    });
  }

  removeBook(id: string) {
    this.booksListService.removeBook(id);
  }

  observeSearch() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        filter((text) => !!(text && text.length > 2))
      )
      .subscribe();
  }
}
