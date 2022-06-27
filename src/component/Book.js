import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

class Book extends Component {
  state ={
    value: this.props.data.shelf
  }
  changeFunc = (event) => {
    this.setState({value: event.target.value});
    BooksAPI.update(this.props.data, event.target.value).then((value) => {
      this.props.onclick(value);
    });
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                this.props.data.imageLinks.smallThumbnail
              })`,
            }}
          />
          <div  className="book-shelf-changer">
            <select value={this.state.value} id="selectBox" onChange={this.changeFunc}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">
                Currently Reading
              </option>
              <option value="wantToRead" >
                Want to Read
              </option>
              <option value="read" >
                Read
              </option>
              <option value="none">
                None
              </option>
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
