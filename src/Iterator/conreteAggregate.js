"use strict";
exports.__esModule = true;
var concreteIterator_1 = require("./concreteIterator");
var AuthorSimple = /** @class */ (function () {
    function AuthorSimple(authorList) {
        this.authorList = authorList;
    }
    AuthorSimple.prototype.createIterator = function () {
        return new concreteIterator_1["default"](this.authorList);
    };
    return AuthorSimple;
}());
exports["default"] = AuthorSimple;
