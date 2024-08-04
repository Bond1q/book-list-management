import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { BookEndpointService } from '@shared/api-gateway/book/book-endpoint.service';
import { Book } from '@shared/api-gateway/book/book.model';

export interface BookListState {
  bookList: Book[];
  loading: boolean;
}

const defaultState: BookListState = {
  bookList: [],
  loading: false,
};

@Injectable({ providedIn: 'root' })
export class BookListService extends ComponentStore<BookListState> {
  private bookEndpointService = inject(BookEndpointService);

  bookList$ = this.select(({ bookList }) => bookList);
  loading$ = this.select(({ loading }) => loading);

  setBookList = this.updater((state, bookList: Book[]) => ({
    ...state,
    bookList,
  }));
  setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  loadBooks = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => this.bookEndpointService.getBookList()),
      tap((bookList) => {
        this.setBookList(bookList);
        this.setLoading(false);
      }),
      catchError(() => {
        this.setLoading(false);
        this.setBookList([]);

        return of();
      })
    )
  );

  updateBook = this.effect((updatedBook$: Observable<Book>) =>
    updatedBook$.pipe(
      withLatestFrom(this.bookList$),
      tap(([updatedBook, bookList]) => {
        const updatedBookList = bookList.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        );

        this.setBookList(updatedBookList);
      })
    )
  );

  createBook = this.effect((newBook$: Observable<Omit<Book, 'id'>>) =>
    newBook$.pipe(
      withLatestFrom(this.bookList$),
      tap(([newBook, bookList]) => {
        this.setBookList([...bookList, { ...newBook, id: uuidv4() }]);
      })
    )
  );

  removeBook = this.effect((bookId$: Observable<string>) =>
    bookId$.pipe(
      withLatestFrom(this.bookList$),
      tap(([bookId, bookList]) => {
        const updatedBookList = bookList.filter(({ id }) => id !== bookId);
        this.setBookList(updatedBookList);
      })
    )
  );

  constructor() {
    super(defaultState);
    this.loadBooks();
  }
}
