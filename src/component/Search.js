import React from "react";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import Book from "./Book";
import { Link } from "react-router-dom";

const Search = ({ handleUpdateCase, Books }) => {
  const [SearchResult, setSerchResult] = React.useState([]);

  const HandleSearch = (ev) => {
    if (ev.target.value.length > 0) {
      ev.preventDefault();
      BooksAPI.search(ev.target.value).then((value) => {
        if (value.length > 0) {
          const res = value.map((book) => {
            const isFound = Books.filter((b) => b.id === book.id);
            console.log(isFound)
            book = isFound.length > 0 ? isFound[0] : book;
            return book ;
          });
          setSerchResult(res);
        }
      });
    } else {
      setSerchResult([]);
    }
  };

  return (
    <React.StrictMode>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={HandleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf-books">
            <ol className="books-grid">
              {SearchResult.map((product) => (
                <Book
                  key={product.id}
                  data={product}
                  handleUpdateCase={handleUpdateCase}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

Book.propTypes = {
  handleUpdateCase: PropTypes.func.isRequired,
};

export default Search;
