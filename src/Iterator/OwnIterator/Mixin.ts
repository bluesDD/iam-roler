export default class AuhtorListMethods<T> {
  constructor(public authorList: T[]) {}

  addToList(author: T) {
    [...this.authorList, author];
  }

  getAuthorList() {
    return this.authorList;
  }
}
