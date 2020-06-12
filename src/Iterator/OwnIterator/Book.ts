import AuthorIterator from "./Iterator";
import AuthorList from "./Aggrigate";

export default class Book {
  private authorIterator: AuthorIterator;

  constructor(authorList: AuthorList){
    this.authorIterator = authorList.createIterator();
  }

  printAuthors() {
    while (this.authorIterator.hasNext()){
      const author = this.authorIterator.next();
      console.log(author);
    }
  }
}
