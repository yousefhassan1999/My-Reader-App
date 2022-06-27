import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./component/Shelf";
import Book from "./component/Book";

class BooksApp extends React.Component {
  state = {
    Books: [],
    shelves: {}, // Group Products Into Categories
    showSearchPage: false,
    SearchResult: [],
  };
  /**
   * Get Books From Books Api
   */
  componentDidMount = () => {
    BooksAPI.getAll()
      .then((value) => {
        this.Books = value;
      })
      .then(() => {
        // console.log(this.Books);
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
        /** Set State */
        this.setState({
          shelves: groupby("shelf", this.Books),
        });
      });
  };

  handleUpdateCase = () => {
    BooksAPI.getAll()
      .then((value) => {
        this.Books = value;
      })
      .then(() => {
        // console.log(this.Books);
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
        /** Set State */
        this.setState({
          shelves: groupby("shelf", this.Books),
        });
      });
  };

  HandleSearch = (ev) => {
    if (ev.target.value.length>0) {
      ev.preventDefault();
      BooksAPI.search(ev.target.value).then((value) => {
        if (value.length>0) {
          this.setState({
            SearchResult: value,
          });
        }

      });
    }
    else{
      this.setState({
        SearchResult: []
      });
    }
  };

  render() {
    const { shelves } = this.state;
    const Shelfs = Object.keys(shelves).map((shelf) => {
      return (
        <Shelf
          category={shelf}
          productCatShow={shelves[shelf]}
          key={shelf}
          onclick={this.handleUpdateCase}
        />
      );
    });
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() =>
                  this.setState({ showSearchPage: false, SearchResult: [] })
                }
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={this.HandleSearch}
                />
              </div>
            </div>
            <div className="search-books-results">
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.SearchResult.map((product) => (
                    <Book
                      key={product.id}
                      data={product}
                      onclick={this.handleUpdateCase}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>{Shelfs}</div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
