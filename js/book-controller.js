'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map((book) => {
        return `
        <tr>
            <td>${book.id}</td>
            <td class="book-title">${book.name}</td>
            <td>${book.price}<span data-trans="currency-sign">$</span></td>
            <td class="btns"><button class="btn btn-read" onclick="onBookDetails(${book.id})" data-trans="read">Read</button></td>
            <td class="btns"><button class="btn btn-update" onclick="onUpdateBook(${book.id})" data-trans="update">Update</button></td>
            <td class="btns"><button class="btn btn-delete" onclick="onRemoveBook(${book.id})" data-trans="delete">Delete</button></td>
        </tr>
        `;
    });
    document.querySelector('.books-table').innerHTML = strHtmls.join('');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    var name = document.querySelector('[name="new-book-name"]').value;
    var price = document.querySelector('[name="new-book-price"]').value;
    if (name.trim().length && price.trim().length) {
        toggleAddBookModal();
        addBook(name, price);
        renderBooks();
    }
}

function onUpdateBook(bookId) {
    var book = getBook(bookId);
    if (!book) return;
    toggleAddBookModal();
    document.querySelector('.btn-add-submit').classList.add('hide');
    document.querySelector('.btn-update-submit').classList.remove('hide');
    var elBookName = document.querySelector('[name=new-book-name]');
    elBookName.value = book.name;
    elBookName.disabled = true;
    setUpdateBookId(bookId);
}

function onSubmitUpdate() {
    var price = document.querySelector('[name=new-book-price]').value;
    if (!price.trim().length) return;
    var bookId = getUpdateBookId();
    if (bookId) {
        updateBook(bookId, price);
        setUpdateBookId('');
        toggleAddBookModal();
        renderBooks();
    }
}

function onBookDetails(bookId) {
    toggleDetailsModal();
    var currBook = getBook(bookId);
    if (!currBook) return;
    document.querySelector('.book-details h1').innerText = currBook.name;
    document.querySelector('.book-details img').src = currBook.imgUrl;
    document.querySelector('.book-details .price').innerText = currBook.price;
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
}

function toggleAddBookModal() {
    var elInputs = document.querySelectorAll('.new-book-modal input');
    elInputs.forEach((elInput) => {
        elInput.value = '';
        elInput.disabled = false;
    });
    document.querySelector('.btn-add-submit').classList.remove('hide');
    document.querySelector('.btn-update-submit').classList.add('hide');
    document.querySelector('.new-book-modal').classList.toggle('hide');
    document.querySelector('.modal').classList.toggle('hide');
}

function toggleDetailsModal() {
    document.querySelector('.book-details').classList.toggle('hide');
    document.querySelector('.modal').classList.toggle('hide');
}

function handleKey(ev) {
    if (ev.key === 'Escape') {
        if (!document.querySelector('.new-book-modal').classList.contains('hide')) toggleAddBookModal();
        else if (!document.querySelector('.book-details').classList.contains('hide')) toggleDetailsModal();
    }
}