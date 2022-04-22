const bookList = document.querySelector('.books');
const form = document.getElementById('added-book');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const listMenu = document.querySelector('#list-menu');
const formMenu = document.querySelector('#form-menu');
const contactMenu = document.querySelector('#contact-menu');
const formSec = document.querySelector('#add-new');
const listSec = document.querySelector('#list');
const contSec = document.querySelector('#contact');

listMenu.addEventListener('click', () => {
  formSec.style.display = 'none';
  contSec.style.display = 'none';
  listSec.style.display = 'block';
});

formMenu.addEventListener('click', () => {
  formSec.style.display = 'block';
  contSec.style.display = 'none';
  listSec.style.display = 'none';
});

contactMenu.addEventListener('click', () => {
  formSec.style.display = 'none';
  contSec.style.display = 'block';
  listSec.style.display = 'none';
});

let books = [];

class BookClass {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  bookCode() {
    return `<article class="added-book"><p class="title">${this.title}</p>
                 <p>${this.author}</p>
                <button data-id=${this.id} class="remove">Remove</button>
                </article><hr>`;
  }

  static addBook(book) {
    let id = 1;
    if (books.length > 0) {
      id = books[books.length - 1].id + 1;
    }
    book.id = id;
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static remove(id) {
    books = books.filter((b) => b.id !== Number(id));
    localStorage.setItem('books', JSON.stringify(books));
  }

  static showBooks() {
    const booksCode = books
      .map((book) => new BookClass(book.title, book.author, book.id)
        .bookCode());
    bookList.innerHTML = booksCode.join('');
    const deleteBtn = document.querySelectorAll('.remove');
    deleteBtn.forEach((el) => {
      el.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        BookClass.remove(id);
        BookClass.showBooks();
      });
    });
  }
}
const storeBooks = JSON.parse(localStorage.getItem('books'));

if (storeBooks) {
  books = storeBooks;
  BookClass.showBooks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    return;
  }
  const newBook = new BookClass(title, author);
  BookClass.addBook(newBook);
  BookClass.showBooks();
  titleInput.value = '';
  authorInput.value = '';
});
