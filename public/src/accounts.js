function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  const sortByLastname = accounts.sort((a, b) => {
    return a.name.last < b.name.last ? -1 : 1
  })
  return sortByLastname
}

function getTotalNumberOfBorrows(account, books) {
  const customerId = account.id
  let count = 0
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (books[i].borrows[j].id === customerId) count++
    }
  }
  return count
}

const getAuthorById = (author, id) => {
  return author.find((author) => author.id === id)
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id

  let result = []

  result = books.filter((book) => {
    return book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned)
  })

  result = result.map((book) => {
    const author = getAuthorById(authors, book.authorId)
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