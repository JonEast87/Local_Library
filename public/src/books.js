function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = new Array(),
    checkedIn = new Array(),
    allBooks = new Array()

    for (let i = 0; i < books.length; i++) {
      if (books[i].borrows.every((ele) => ele.returned === true)) checkedIn.push(books[i])
      else checkedOut.push(books[i])
    }
    allBooks.push(checkedOut, checkedIn)
    return allBooks
}

/* copied this from accounts.js due to issues with export/requiring it from accounts.js */
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function getBorrowersForBook(book, accounts) {
  const transactions = book.borrows

  const result = transactions.map((transaction) => {
    const accountInfo = findAccountById(accounts, transaction.id)
    const newTransaction = {
      ...transaction,
      ...accountInfo
    }
    return newTransaction
  })

  result.splice(10)

  return result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};