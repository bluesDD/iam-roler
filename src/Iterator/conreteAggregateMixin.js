"use strict";
exports.__esModule = true;
var AuthorListMethods = /** @class */ (function () {
    function AuthorListMethods(authorList) {
        this.authorList = authorList;
    }
    AuthorListMethods.prototype.addToList = function (author) {
        this.authorList.push(author);
    };
    AuthorListMethods.prototype.getAuthorList = function () {
        return this.authorList;
    };
    return AuthorListMethods;
}());
exports["default"] = AuthorListMethods;
