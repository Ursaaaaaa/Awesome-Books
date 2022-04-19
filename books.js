const books = [
    {
      title: 'Life and Living',
      author: 'John Doe',
      id: 1,
    },
    {
      title: 'Becoming',
      author: 'Michelle Obama',
      id: 2,
    },
  ];
  
  const bookListSection = document.querySelector('#book-list');
  
  function displayBooksList(bookList) {
    bookListSection.innerHTML = bookList.map((book) => `
  <p class="title">${book.title}</p>
              <p>${book.author}</p>
              <button data-id=${book.id} class="remove">Remove</button>
              <hr>`).join('');
  }
  
  function storeBook(bookList) {
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }

  function getBookList() {
    const bookListFromLocalStorage = localStorage.getItem('bookList');
    if (bookListFromLocalStorage) {
      return JSON.parse(bookListFromLocalStorage);
    }
    return books;
  }
  
  displayBooksList(getBookList());
  
  const addBook = document.querySelector('#add-book');
  addBook.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = event.target.querySelector('#title').value;
    const author = event.target.querySelector('#author').value;
    const bookList = getBookList();
    const id = bookList.length + 1;
    bookList.push({
      title,
      author,
      id,
    });
    this.reset();
    displayBooksList(bookList);
    storeBook(bookList);
  });
  
  bookListSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
      const { id } = event.target.dataset;
      const bookList = getBookList();
      const bookListFiltered = bookList.filter((book) => book.id !== +id);
      displayBooksList(bookListFiltered);
      storeBook(bookListFiltered);
    }
  });