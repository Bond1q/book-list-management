import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Book } from '@shared/api-gateway/book/book.model';
import { BookListService } from './../../services/book-list.service';

interface BookForm {
  id: FormControl<string | null>;
  title: FormControl<string>;
  author: FormControl<string>;
  year: FormControl<number>;
  description: FormControl<string>;
  cover: FormControl<string>;
}

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss',
})
export class BookModalComponent implements OnInit {
  initialData: Partial<Book> = inject(MAT_DIALOG_DATA);
  bookListService = inject(BookListService);
  formBuilder = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef<BookModalComponent>);

  bookForm!: FormGroup<BookForm>;

  ngOnInit(): void {
    this.createBookForm();
  }

  private createBookForm() {
    this.bookForm = this.formBuilder.group<BookForm>({
      id: this.formBuilder.control(this.initialData?.id ?? null),
      title: this.formBuilder.control(this.initialData?.title ?? '', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      author: this.formBuilder.control(this.initialData?.author ?? '', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      year: this.formBuilder.control(
        this.initialData?.year ?? new Date().getFullYear(),
        [Validators.required]
      ),
      description: this.formBuilder.control(
        this.initialData?.description ?? '',
        [Validators.required, Validators.maxLength(250)]
      ),
      cover: this.formBuilder.control(this.initialData?.cover ?? ''),
    });
  }

  createOrEditBook() {
    if (!this.bookForm.valid) {
      return;
    }

    const book = this.bookForm.getRawValue();

    book.id
      ? this.bookListService.updateBook(book as Book)
      : this.bookListService.createBook(book);

    this.dialogRef.close();
  }

  removeBookFromList() {
    if (this.bookForm.value.id) {
      this.bookListService.removeBook(this.bookForm.value.id);
      this.dialogRef.close();
    }
  }

  onFileChanged(event: Event) {
    const files = (event?.target as HTMLInputElement)?.files;

    if (files && files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.bookForm.controls.cover.setValue(reader.result as string);
        this.bookForm.markAsDirty();
      };
    }
  }
}
