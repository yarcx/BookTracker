class Book  {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Ui {
    addBook(book) {
        
        
    }

    clearInput() {
        document.querySelector("#title") .value = "";
        document.querySelector("#author") .value = "";
        document.querySelector("#isbn") .value = "";
    }

    showNotification(className, errorMessage) {
        const div = `<div class="${className}">${errorMessage}</div>`;
        const h1 = document.querySelector(".container h1")
        
        h1.insertAdjacentHTML("afterend", div)

        setTimeout(() => {
            const container = document.querySelector(".container");
            container.removeChild(
              document.getElementsByClassName(`${className}`)[0]
            );
            
        }, 1500);
    }

    deleteBook(e) {
        if (e.className === "delete") {
            e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement)
        }
    }

}


class Store {
    static getBooksFromStore() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = []
            localStorage.setItem("books", JSON.stringify(books))
        } else {
           books = JSON.parse(localStorage.getItem("books"))
        }
        return books
    }

    static addBookToStore(book) {
        let books = Store.getBooksFromStore()
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBookFromStore(isbn) {
        let book = isbn.parentElement.previousElementSibling.textContent
        let Books = Store.getBooksFromStore() 

        Books.forEach((novel, index) => {
            if (novel.isbn == book) {
                Books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(Books))

    }

    static showBookInStore() {
        let books = Store.getBooksFromStore()

        books.forEach(function (book) {
            const bookList = document.querySelector("#book-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="delete">X<a></td>
                `;
            bookList.appendChild(row);
        })
    }
}


window.addEventListener("DOMContentLoaded", Store.showBookInStore
)
// Grabbing the submit button to add an event listner
const submit = document.querySelector('input[type="Submit"]');

// adding the event listner to the submit button
submit.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    const ui = new Ui();
    // validating the add book form submission
    if (title == "" || author == "" || isbn == "") {
        ui.showNotification("error", "please fill in all fields")
    } else {
      // instantiating the book class here
        ui.showNotification("success", "Book Added");
        const book = new Book(title, author, isbn);
        ui.addBook(book)
        Store.addBookToStore(book)
        ui.clearInput()
    }

})



// Deleting a book fromm the list using event delegation
const deleteBtn = document.querySelector("#book-list");
    
deleteBtn.addEventListener("click", (e) => {
    const ui = new Ui();

    ui.deleteBook(e.target)
    Store.removeBookFromStore(e.target)
    ui.showNotification(
          "success",
          "Book Removed"
        );
})