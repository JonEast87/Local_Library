function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  const sortByLastname = accounts.sort((accountA, accountB) => {
    return accountA.name.last < accountB.name.last ? -1 : 1
  })
  return sortByLastname
}

function getTotalNumberOfBorrows(account, books) {
  const customerId = account.id
  let count = 0

  for (let book in books) {
    // object deconstructor to assign the borrows array for easy access using the for in loop
    const { borrows } = books[book]
    // with borrows isolated forEach easily reaches in to check the ids for the count
    borrows.forEach((element) => {
      if (element.id === customerId) {
        count++
      }
    })
  }

  return count
}

// helper function to find author id for getBooksPossessedByAccount
const _getAuthorById = (author, id) => {
  return author.find((author) => author.id === id)
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id

  let result = []

  // makes an array of non-returned books for given account
  result = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned)
  })

  // new objects are added to the given array
  result = result.map((book) => {
    const author = _getAuthorById(authors, book.authorId)
    // spread operator used to combine book with the author info in the new object
    const newBook = {
      ...book,
      author,
    }

    return newBook
  })

  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};