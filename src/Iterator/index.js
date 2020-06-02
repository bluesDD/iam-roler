"use strict";
exports.__esModule = true;
var Book_1 = require("./Book");
var conreteAggregate_1 = require("./conreteAggregate");
var authorsSimpleList = [
    'Kishi Yusuke',
    'Inui Kurumi',
    'Higashino Keigo',
    'Ayatsuji Yukito',
    'Hyakuta Naoki'
];
var authorsDetailedList = [
    {
        familyName: 'Kishi',
        givenName: 'Yusuke',
        id: 5
    },
    {
        familyName: 'Inui',
        givenName: 'Kurumi',
        id: 17
    },
    {
        familyName: 'Higashino',
        givenName: 'Keigo',
        id: 25
    },
    {
        familyName: 'Ayatsuji',
        givenName: 'Yukito',
        id: 1
    },
    {
        familyName: 'Hyakuta',
        givenName: 'Naoki',
        id: 48
    }
];
var bookA = new Book_1["default"](new conreteAggregate_1["default"](authorsSimpleList));
bookA.printAuthors();
