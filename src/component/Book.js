import React from "react";
import PropTypes from "prop-types";

const Book = ({ data, handleUpdateCase }) => {
  const changeFunc = (event) => {
    handleUpdateCase(data, event.target.value);
  };
  const imageLinks = data.hasOwnProperty("imageLinks")
    ? `url(${data.imageLinks.smallThumbnail})`
    : `url(})`;

  const authors = data.hasOwnProperty("authors") ? data.authors : "";
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: imageLinks,
          }}
        />
        <div className="book-shelf-changer">
          <select value={data.hasOwnProperty("shelf") ? data.shelf : "none" } id="selectBox" onChange={changeFunc}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

Book.propTypes = {
  data: PropTypes.object.isRequired,
  handleUpdateCase: PropTypes.func.isRequired,
};

export default Book;
