import { Author } from './../index.d';
import AuhtorListMethods from "./Mixin";
import AuthorListSimpleIterator from './concreteIterator';
import AuthorList from './Aggrigate';

export default class AuthorSimple implements AuhtorListMethods<Author>, AuthorList {
  addToList!: (author: Author) => void;
  getAuthorList!: () => Author[];

  constructor(public authorList: Author[]){}

  createIterator() {
    return new AuthorListSimpleIterator(this.authorList);
  }  
}
