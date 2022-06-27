import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

class Book extends Component {
  HandleSearch = (ev) => {
      ev.preventDefault();
      BooksAPI.update(this.props.data,ev.target.value).then((value) => {
        this.props.onclick(value)
      });
  };
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
              `url(${this.props.data.imageLinks.smallThumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading" onClick={this.HandleSearch}>Currently Reading</option>
              <option value="wantToRead" onClick={this.HandleSearch}>Want to Read</option>
              <option value="read" onClick={this.HandleSearch}>Read</option>
              <option value="none" onClick={this.HandleSearch}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.data.title}</div>
        <div className="book-authors">{this.props.data.authors}</div>
      </div>
    );
  }
}

export default Book;
