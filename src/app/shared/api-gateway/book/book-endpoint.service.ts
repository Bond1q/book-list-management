import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Book } from './book.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class BookEndpointService {
  private books: Book[] = [
    {
      id: uuidv4(),
      title: 'The Whispering Shadows',
      author: 'Emily Harper',
      year: 2018,
      cover:
        'https://book-ye.com.ua/upload/resize_cache/iblock/ace/230_355_1/3fbf3e12_2975_11ef_81a1_005056857596_ad941242_2976_11ef_81a1_005056857596.jpg',
      description:
        'A thrilling mystery that delves into the dark secrets of a small town haunted by its past.',
    },
    {
      id: uuidv4(),
      title: 'Journey to the Forgotten Land',
      author: 'Michael Stanton',
      year: 2021,
      cover:
        'https://book-ye.com.ua/upload/iblock/940/11d8a148_08c5_11e7_80c5_000c29ae1566_63562e82_af35_11eb_814a_0050568ef5e6.jpg',
      description:
        'An epic fantasy adventure following a group of heroes on a quest to uncover a lost civilization.',
    },
    {
      id: uuidv4(),
      title: 'The Quantum Enigma',
      author: 'Laura Bennett',
      year: 2016,
      description:
        'A sci-fi novel exploring the mysteries of quantum mechanics and its implications on reality.',
    },
    {
      id: uuidv4(),
      title: 'Love in the Time of AI',
      author: 'Robert Chang',
      year: 2023,
      cover:
        'https://book-ye.com.ua/upload/resize_cache/iblock/8fb/230_355_1/2e7987ad_48c9_11ef_81a4_005056857596_502b9427_4e7c_11ef_81a5_005056857596.jpg',
      description:
        'A futuristic romance set in a world where artificial intelligence governs human interactions.',
    },
    {
      id: uuidv4(),
      title: 'Beneath the Crimson Sky',
      author: 'Isabella Garcia',
      year: 2019,
      description:
        'A historical drama that traces the lives of two families during the Spanish Civil War.',
    },
    {
      id: uuidv4(),
      title: 'Echoes of the Lost',
      author: 'Daniel Reynolds',
      year: 2020,
      description:
        "A gripping suspense novel about a detective's quest to solve a series of disappearances in a remote town.",
    },
    {
      id: uuidv4(),
      title: 'The Last Astronaut',
      author: 'Sophia Martin',
      year: 2022,
      description:
        'A space opera following the journey of the last human astronaut on a mission to save Earth.',
    },
    {
      id: uuidv4(),
      title: 'The Art of Deception',
      author: 'Henry Thompson',
      year: 2017,
      cover:
        'https://book-ye.com.ua/upload/resize_cache/iblock/dfe/230_355_1/4f845495_2fdf_11ef_81a1_005056857596_fcadc33a_2fe0_11ef_81a1_005056857596.jpg',
      description:
        'A psychological thriller that unravels the complex web of lies and deceit in a high-stakes art heist.',
    },
    {
      id: uuidv4(),
      title: 'Voices from the Abyss',
      author: 'Olivia Mitchell',
      year: 2015,
      description:
        'A horror novel that explores the terrifying events surrounding a deep-sea expedition gone wrong.',
    },
    {
      id: uuidv4(),
      title: 'The Timeless Garden',
      author: 'Grace Peterson',
      year: 2024,
      description:
        'A magical realism story about a hidden garden that holds the key to time travel and its impact on the lives of those who discover it.',
    },
  ];

  getBookList(): Observable<Book[]> {
    return of<Book[]>(this.books).pipe(delay(Math.random() * 100));
  }

  constructor() {}
}
