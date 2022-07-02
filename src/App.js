import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import "./App.css";
import Shelf from "./component/Shelf";
import Search from "./component/Search";

const BooksApp = () => {
  let navigate = useNavigate();
  const [Books, setBooks] = React.useState([]);
  const [shelves, setShelves] = React.useState({});
  /**
   * Get Books From Books Api
   */
  React.useEffect(() => {
    BooksAPI.getAll().then((value) => {
      setBooks(value);
    });
  }, []);
  React.useEffect(
    () => {
      setShelves(groupby("shelf", Books));
    },
    [Books]
  );
  const groupby = (key, arr) =>
    arr.reduce(
      (cache, product) => ({
        ...cache,
        [product[key]]:
          product[key] in cache
            ? cache[product[key]].concat(product)
            : [product],
      }),
      {}
    );
  const handleUpdateCase = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      shelf === "none"? setBooks([...Books.filter((b) => b.id !== book.id)]): setBooks([...Books.filter((b) => b.id !== book.id), book]);
      setShelves(groupby("shelf", Books));
    });
    navigate("/");
  };

  const Shelfs = Object.keys(shelves).map((shelf) => {
    return (
      <Shelf
        category={shelf}
        productCatShow={shelves[shelf]}
        key={shelf}
        handleUpdateCase={handleUpdateCase}
      />
    );
  });
  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>{Shelfs}</div>
              </div>
              <div className="open-search">
                <Link to="/Search" className="add-contact">
                  Add a book
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/Search"
          element={<Search handleUpdateCase={handleUpdateCase} Books={Books} />}
        />
      </Routes>
    </div>
  );
};

export default BooksApp;
