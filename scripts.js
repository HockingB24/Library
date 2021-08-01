var myLibrary = [];

//Define book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readString = "";
        if (read) {
            readString = "already read";
        }
        else {
            readString = "not read yet";
        }
        return (this.title + " by " + this.author + 
                ", " + this.pages + " pages, " + readString);
    }
}

//Add Book function 
function addBookToLibrary(book) {
    myLibrary.push(book);
}

//Clear books out from MyLibrary
function clearBooks() {
    let tableRows = document.querySelectorAll('.row');
    for (i=0; i<tableRows.length; i++) {
        let row = tableRows[i];
        row.remove();
    }
}

//Views books through rendering table of all entries in MyLibrary

function viewBooks() {

    clearBooks();

    for (i = 0; i < myLibrary.length; i++) {
        thisBook = myLibrary[i];
        let tableRow = document.createElement('tr');
        tableRow.classList.add("row");
        tableRow.setAttribute("id", i);
        tableBody.appendChild(tableRow);

        let title = document.createElement('td');
        title.innerHTML = thisBook.title;
        let author = document.createElement('td');
        author.innerHTML = thisBook.author;
        let pages = document.createElement('td');
        pages.innerHTML = thisBook.pages;
        let read = document.createElement('td');
        read.innerHTML = thisBook.read;

        let readToggleCell = document.createElement('td');
        let readBtn = document.createElement('button');
        readToggleCell.appendChild(readBtn);
        readBtn.setAttribute("id", i);
        readBtn.addEventListener('click', toggleRead);
        readBtn.innerHTML = "Toggle Read Status";
        

        let removeBtnCell = document.createElement('td');
        let removeBtn = document.createElement('button');
        removeBtnCell.appendChild(removeBtn);
        removeBtn.innerHTML = "REMOVE BOOK";
        removeBtn.style.backgroundColor = '#FF8686';
        removeBtn.addEventListener("click", removeBook);
        removeBtn.setAttribute("id", i);

        tableRow.appendChild(title);
        tableRow.appendChild(author);
        tableRow.appendChild(pages);
        tableRow.appendChild(read);
        tableRow.appendChild(readToggleCell);
        tableRow.appendChild(removeBtnCell);
        
        //console.log(tableRow);
        
    }
}


//Toggle the Read Status of a book on the table
function toggleRead (e) {
    readBtn = e.srcElement;
    readId = readBtn.id; 
    for (i = 0; i < myLibrary.length; i++) {
        if (i == readId) {
            myBook = myLibrary[i];
            if (myBook.read == "Yes") {
                myBook.read = "No";
            }
            else {
                myBook.read = "Yes";
            }
            console.log("hi");
            break;
        }
    }
    viewBooks();

}

//Remove selected book from MyLibrary, re-render table
function removeBook (e) {
    removeBtn = e.srcElement;
    let removedRow = removeBtn.id;
    for (i = 0; i < myLibrary.length; i++) {
        if (i == removedRow) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    viewBooks();

}



//Make book object from form input
function validateForm(e) {
    
    console.log("hi");
    let fTitle = document.querySelector('#title').value;
    let fAuthor = document.querySelector('#author').value;
    let fPages = document.querySelector('#pages').value;
    let fRead = document.querySelector('#read').value;

    let readSelect = "";
    if (fRead == "on") {
        readSelect = "Yes";
    }
    else {
        readSelect = "No";
    }
    let newBook = new Book(fTitle, fAuthor, fPages, readSelect);
    addBookToLibrary(newBook);
    viewBooks();
    formDiv.style.display = "none";
    e.preventDefault();
}


//Show form on button-click
function showForm () {
    console.log('hi');
    formDiv.style.display = "block";

}


//initializing variables 

let table = document.querySelector('#tbl');
table.border = '1';


let tableBody = document.createElement('TBODY');
table.appendChild(tableBody);

let addBookForm = document.querySelector(".form");
addBookForm.addEventListener("submit", validateForm);

let formDiv = document.querySelector('#formDiv');
let newBookButton = document.querySelector('#newBookButton');
newBookButton.addEventListener("click", showForm);


