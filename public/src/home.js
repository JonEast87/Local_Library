function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const checkedOut = new Array(),
    checkedIn = new Array()

  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows.every((ele) => ele.returned === true)) checkedIn.push(books[i])
    else checkedOut.push(books[i])
  }
  return checkedOut.length
}

function getMostCommonGenres(books) {   
  const result = books.reduce((acc, book) => {
    const genre = book.genre
    
    const genreInfo = acc.find((ele) => ele.name === genre)

    if (!genreInfo) {
      let newGenre = {
        name: genre,
        count: 1
      }
      acc.push(newGenre)
    } else {
      genreInfo.count++
    }
    
    return acc
  }, [])

  result.sort((a, b) => b.count - a.count)

  result.splice(5)

  return result
}

function getMostPopularBooks(books) {
  const result = books.map((book) => {
      let newBookCount = {
        name: book.title,
        count: book.borrows.length
      }

      return newBookCount
  })

  result.sort((a, b) => b.count - a.count)

  result.splice(5)

  return result;
}

const getBooksByAuthorId = (books, authorId) => {
  return books.filter((book) => book.authorId === authorId)
}

function getMostPopularAuthors(books, authors) {   
  const result = authors.map((author) => {
    const fullname = `${author.name.first} ${author.name.last}`,
      booksByAuthor = getBooksByAuthorId(books, author.id),
      totalBorrows = booksByAuthor.reduce((acc, book) => acc + book.borrows.length, 0),
      authorInfo = {
        name: fullname, 
        count: totalBorrows
      }
    return authorInfo
  })

  result.sort((a, b) => b.count - a.count)

  result.splice(5)

  return result
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
