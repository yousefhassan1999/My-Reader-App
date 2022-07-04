import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
const Shelf = ({ productCatShow, category, handleUpdateCase }) => {
  const Books = productCatShow.map((product) => {
    return (
      <li key={product.id}>
        <Book data={product} handleUpdateCase={handleUpdateCase} />
      </li>
    );
  });
  const Cat = category.split(/(?=[A-Z])/).join(' ').toUpperCase() ;
  return (
    <React.Fragment>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{Cat}</h2>
        <div className="bookshelf-books" data-simplebar>
          <ol className="books-grid">{Books}</ol>
        </div>
      </div>
    </React.Fragment>
  );
};

Shelf.propTypes = {
  productCatShow: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  handleUpdateCase: PropTypes.func.isRequired,
};

export default Shelf;
