import { Author } from "./index.d";
import Book from "./Book";
import AuthorSimple from "./concreteAggrigate";

const authorsSimpleList: Author[] = [
  'Kishi Yusuke',
  'Inui Kurumi',
  'Higashino Keigo',
  'Ayatsuji Yukito',
  'Hyakuta Naoki'
];

const bookA = new Book(new AuthorSimple(authorsSimpleList));
bookA.printAuthors();
