import AuthorIterator from './Iterator';
import { Author } from './index.d';

export default class AuthorListTwiceIterator implements AuthorIterator{
  private index = 0;

  constructor(private authors: Author[]){}

  hasNext() {
    return this.index < this.authors.length * 2;
  }

  
  next() {
    return this.authors[this.index++];
  }
}
