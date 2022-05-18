function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = new Array(),
    checkedIn = new Array(),
    allBooks = new Array()

    for (let i = 0; i < books.length; i++) {
      if (books[i].borrows.every(ele => ele.returned === true)) checkedIn.push(books[i])
      else checkedOut.push(books[i])
    }
    allBooks.push(checkedOut, checkedIn)
    return allBooks
}

function getBorrowersForBook(book, accounts) {}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};