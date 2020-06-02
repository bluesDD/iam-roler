import AuthorList from './Agrigate';
import AuthorIterator from './Iterator';

export default class Book {
  private authorIterator: AuthorIterator;

  constructor(authorList: AuthorList){
    this.authorIterator = authorList.createIterator();
  }

  printAuthors() {
    while (this.authorIterator.hasNext()) {
      const author = this.authorIterator.next();
      console.log(author);
    }
  }
}
