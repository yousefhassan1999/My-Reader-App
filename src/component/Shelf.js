import React, { Component } from "react";
import Book from "./Book";

class Shelf extends Component {
  render() {
    const { productCatShow } = this.props;
    const Books = productCatShow.map((product) => {
      return (
        <li key={product.id}>
          <Book data={product} onclick={this.props.onclick} />
        </li>
      );
    });

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.category}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">{Books}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
