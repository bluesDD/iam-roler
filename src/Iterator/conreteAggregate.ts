import AuthorList from './Agrigate';
import AuthorListSimpleIterator from './concreteIterator';
import AuthorListMethods from './conreteAggregateMixin';
import { Author } from './index.d';

export default class AuthorSimple implements AuthorListMethods<Author>, AuthorList {
  addToList!: (author: Author) => void;
  getAuthorList!: () => Author[];
  
  constructor(public authorList: Author[]){}

  createIterator() {
    return new AuthorListSimpleIterator(this.authorList);
  }
}
