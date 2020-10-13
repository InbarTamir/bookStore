'use strict';
const STORAGE_BOOKS_KEY = 'booksDB';
const STORAGE_CURR_ID_KEY = 'currIdDB';

var gId = _getCurrId();
var gBooks = _createBooks();
var gUpdateBookId;

function _getCurrId() {
    var currId = loadFromStorage(STORAGE_CURR_ID_KEY);
    return (currId) ? currId : 1;
}

function getBooks() {
    return gBooks;
}

function getBook(bookId) {
    return gBooks.find((book) => book.id === bookId);
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex((book) => book.id === bookId);
    if (bookIdx >= 0) gBooks.splice(bookIdx, 1);
    _saveBooks(gBooks);
}

function addBook(name, price) {
    gBooks.push(_createBook(name, price));
    _saveBooks(gBooks);
}

function updateBook(bookId, price) {
    var currBook = getBook(bookId);
    currBook.price = price;
    _saveBooks(gBooks);
}

function setUpdateBookId(bookId) {
    gUpdateBookId = bookId;
}

function getUpdateBookId() {
    return gUpdateBookId;
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_BOOKS_KEY);
    if (!books || !books.length) {
        books = [];
        books.push(_createBook('Harry Potter and the Philosophers Stone', 20, 'img/1.jpg'));
        books.push(_createBook('Harry Potter and the Chamber of Secrets', 20, 'img/2.jpg'));
        books.push(_createBook('Harry Potter and the Prisoner of Azkaban', 20, 'img/3.jpg'));
        books.push(_createBook('Harry Potter and the Goblet of Fire', 20, 'img/4.jpg'));
        books.push(_createBook('Harry Potter and the Order of the Phoenix', 20, 'img/5.jpg'));
        books.push(_createBook('Harry Potter and the Half-Blood Prince', 20, 'img/6.jpg'));
        books.push(_createBook('Harry Potter and the Deathly Hallows', 20, 'img/7.jpg'));
        _saveBooks(books);
    }
    return books;
}

function _createBook(name, price, imgUrl = '') {
    return {
        id: gId++,
        name,
        price,
        imgUrl
    };
}

function _saveBooks(books) {
    saveToStorage(STORAGE_BOOKS_KEY, books);
    _saveCurrId(gId);
}

function _saveCurrId(id) {
    saveToStorage(STORAGE_CURR_ID_KEY, id);
}