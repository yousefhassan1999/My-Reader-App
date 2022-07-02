import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

const Shelf = ({ productCatShow, category, handleUpdateCase }) => {
  const Books = productCatShow.map((product) => {
    return (
      <li key={product.id}>
        <Book data={product} handleUpdateCase={handleUpdateCase} />
      </li>
    );
  });

  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{Books}</ol>
        </div>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  productCatShow: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  handleUpdateCase: PropTypes.func.isRequired,
};

export default Shelf;
