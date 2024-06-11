// Book Constructor
function Book(title, author, isAvailable = true) {
  this.title = title;
  this.author = author;
  this.isAvailable = isAvailable;
}

// Member Constructor
function Member(name, borrowedBooks = []) {
  this.name = name;
  this.borrowedBooks = borrowedBooks;
}

// Borrow Book Method for Member
Member.prototype.borrowBook = function(book) {
  if (this.borrowedBooks.length >= 3) {
    console.log(`${this.name} has reached the maximum limit of borrowed books.`);
    return;
  }
  
  if (book.isAvailable) {
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} borrowed "${book.title}".`);
  } else {
    console.log(`Sorry, "${book.title}" is already borrowed.`);
  }
};

// PremiumMember Constructor
function PremiumMember(name, borrowedBooks = []) {
  Member.call(this, name, borrowedBooks);
  this.specialCollectionAccess = true;
}

// Borrow Book Method for PremiumMember
PremiumMember.prototype.borrowBook = function(book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} has reached the maximum limit of borrowed books.`);
    return;
  }

  if (book.isAvailable || this.specialCollectionAccess) {
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} borrowed "${book.title}".`);
  } else {
    console.log(`Sorry, "${book.title}" is already borrowed or requires special collection access.`);
  }
};

// Demonstration
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee");
const book3 = new Book("1984", "George Orwell");

const regularMember = new Member("John Doe");
const premiumMember = new PremiumMember("Jane Smith");

regularMember.borrowBook(book1);
premiumMember.borrowBook(book1);
regularMember.borrowBook(book2);
premiumMember.borrowBook(book2);
regularMember.borrowBook(book3);
premiumMember.borrowBook(book3);

const borrowBookRegular = regularMember.borrowBook.bind(regularMember);
const borrowBookPremium = premiumMember.borrowBook.bind(premiumMember);

borrowBookRegular(book3);
borrowBookPremium(book3);
