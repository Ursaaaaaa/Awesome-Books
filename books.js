let books = [];
const add = document.querySelector('#add-button');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

add.addEventListener('click', (e) => {
    e.preventDefault();
    const addedBook = new Book(title.value, author.value);
    addedBook.addBook(books);
    title.value = '';
    author.value = '';
    console.log(addedBook);
});

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

document.querySelector('#add-button').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    const book = new Book(title, author);

    console.log(book);
});