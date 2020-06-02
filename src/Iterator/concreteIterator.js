"use strict";
exports.__esModule = true;
var AuthorListSimpleIterator = /** @class */ (function () {
    function AuthorListSimpleIterator(authors) {
        this.authors = authors;
        this.index = 0;
    }
    AuthorListSimpleIterator.prototype.hasNext = function () {
        return this.index < this.authors.length;
    };
    AuthorListSimpleIterator.prototype.next = function () {
        return this.authors[this.index++];
    };
    return AuthorListSimpleIterator;
}());
exports["default"] = AuthorListSimpleIterator;
