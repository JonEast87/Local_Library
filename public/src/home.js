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
    // if condition seperates all returned books from non returned books using the every HoF
    if (books[i].borrows.every((ele) => ele.returned === true)) checkedIn.push(books[i])
    // all non-returned books are stored in checkedOut
    else checkedOut.push(books[i])
  }
  // length method is used to determine the amount of checkedOut books
  return checkedOut.length
}

function getMostCommonGenres(books) {
  const result = books.reduce((acc, book) => {
    const genre = book.genre
    
    // find method that is used to check if the object exists
    const genreInfo = acc.find((ele) => ele.name === genre)

    // if no object exists then create it
    if (!genreInfo) {
      let newGenre = {
        name: genre,
        count: 1
      }
      acc.push(newGenre)
      // added to it's count property if it already does exist
    } else {
      genreInfo.count++
    }
    
    return acc
  }, [])

  // sort and splice to used to pass test
  result.sort((genreA, genreB) => genreB.count - genreA.count)

  result.splice(5)

  return result
}

function getMostPopularBooks(books) {
  const result = books.map((book) => {
    // new object diagram for the book count to be added to the array
      let newBookCount = {
        name: book.title,
        count: book.borrows.length
      }

      return newBookCount
  })

  // sort and splice to used to pass test
  result.sort((bookA, bookB) => bookB.count - bookA.count)

  result.splice(5)

  return result;
}

const getBooksByAuthorId = (books, authorId) => {
  // method used to find all books related to the given authorId
  return books.filter((book) => book.authorId === authorId)
}

function getMostPopularAuthors(books, authors) {
  const result = authors.map((author) => {
    // variable template literal for the first nad last names
    const fullname = `${author.name.first} ${author.name.last}`,
      booksByAuthor = getBooksByAuthorId(books, author.id),
      // acc stores all the borrows length from the filter array that was returned
      totalBorrows = booksByAuthor.reduce((acc, book) => acc + book.borrows.length, 0),
      authorInfo = {
        name: fullname, 
        count: totalBorrows
      }
      
    return authorInfo
  })

  // sort and splice to used to pass test
  result.sort((authorA, authorB) => authorB.count - authorA.count)

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
