import Book from './Book';
import AuthorSimple from './conreteAggregate';
import { Author, AuthorDetailedList } from './index.d';

const authorsSimpleList: Author[] = [
  'Kishi Yusuke',
  'Inui Kurumi',
  'Higashino Keigo',
  'Ayatsuji Yukito',
  'Hyakuta Naoki'
];

const authorsDetailedList: AuthorDetailedList[] = [
  {
    familyName: 'Kishi',
    givenName: 'Yusuke',
    id: 5
  },
  {
    familyName: 'Inui',
    givenName: 'Kurumi',
    id: 17
  },
  {
    familyName: 'Higashino',
    givenName: 'Keigo',
    id: 25
  },
  {
    familyName: 'Ayatsuji',
    givenName: 'Yukito',
    id: 1
  },
  {
    familyName: 'Hyakuta',
    givenName: 'Naoki',
    id: 48
  }
];

const bookA = new Book(new AuthorSimple(authorsSimpleList));
bookA.printAuthors();
