"use strict";
exports.__esModule = true;
var Book = /** @class */ (function () {
    function Book(authorList) {
        this.authorIterator = authorList.createIterator();
    }
    Book.prototype.printAuthors = function () {
        while (this.authorIterator.hasNext()) {
            var author = this.authorIterator.next();
            console.log(author);
        }
    };
    return Book;
}());
exports["default"] = Book;
