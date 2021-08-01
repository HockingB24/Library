var myLibrary = [];
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

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function clearBooks() {
    var tableRows = document.querySelectorAll('.row');
    for (i=0; i<tableRows.length; i++) {
        let row = tableRows[i];
        row.remove();
    }
}


function viewBooks() {

    clearBooks();

    for (i = 0; i < myLibrary.length; i++) {
        thisBook = myLibrary[i];
        var tableRow = document.createElement('tr');
        tableRow.classList.add("row");
        tableRow.setAttribute("id", i);
        tableBody.appendChild(tableRow);

        var title = document.createElement('td');
        title.innerHTML = thisBook.title;
        var author = document.createElement('td');
        author.innerHTML = thisBook.author;
        var pages = document.createElement('td');
        pages.innerHTML = thisBook.pages;
        var read = document.createElement('td');
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




function validateForm(e) {
    
    console.log("hi");
    var fTitle = document.querySelector('#title').value;
    var fAuthor = document.querySelector('#author').value;
    var fPages = document.querySelector('#pages').value;
    var fRead = document.querySelector('#read').value;

    let readSelect = "";
    if (fRead == "on") {
        readSelect = "Yes";
    }
    else {
        readSelect = "No";
    }
    var newBook = new Book(fTitle, fAuthor, fPages, readSelect);
    addBookToLibrary(newBook);
    viewBooks();
    formDiv.style.display = "none";
    e.preventDefault();
}

function showForm () {
    console.log('hi');
    formDiv.style.display = "block";

}



var table = document.querySelector('#tbl');
table.border = '1';


var tableBody = document.createElement('TBODY');
table.appendChild(tableBody);

var addBookForm = document.querySelector(".form");
addBookForm.addEventListener("submit", validateForm);

var formDiv = document.querySelector('#formDiv');
var newBookButton = document.querySelector('#newBookButton');
newBookButton.addEventListener("click", showForm);


