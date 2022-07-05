import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import "./Details.css";
const Details = ({ Data, CloseEv }) => {
  const imageLinks = Data.hasOwnProperty("imageLinks")
    ? `url(${Data.imageLinks.thumbnail})`
    : `url(})`;
  const averageRating = Data.hasOwnProperty("averageRating")
    ? Data.averageRating
    : "No Rating";
  const Categories = Data.hasOwnProperty("categories")
    ? Data.categories
    : "No Category";
  const Description = Data.hasOwnProperty("description")
    ? Data.description
    : "No Description";
  const authors = (Data.hasOwnProperty("authors") ? Data.authors : []).map(
    (d) => <li key={d}>{d}</li>
  );
  return (
    <React.Fragment>
      <Modal show={true} fullscreen={true} onHide={() => CloseEv(false)}>
        <div className="container">
          <Modal.Header closeButton>
            <Modal.Title>{Data.title}</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="container">
            <div className="intro-section">
              <div
                className="Cover"
                style={{
                  width: 128,
                  height: 204,
                  backgroundImage: imageLinks,
                }}
              />
              <div className="info-cont">
                <div className="authors">
                  <span> Authors : </span>
                  {authors}
                </div>
                <div className="book-avgrating">
                  <span> Average rate : </span>
                  {averageRating}
                </div>
                <div className="book-contentVersion">
                  <span> Content Version : </span>
                  {Data.contentVersion}
                </div>
                <div className="book-pageCount">
                  <span> Page Count : </span>
                  {Data.pageCount}{" "}
                </div>
                <div className="book-publishedDate">
                  <span>Published Date : </span>
                  {Data.publishedDate}{" "}
                </div>
              </div>
            </div>
            <div className="book-categories">
              <span> Categories : </span>
              {Categories}
            </div>
            <div className="book-description">
              <span> Description : </span>
              {Description}
            </div>
            <div className="book-infoLink">
              <Button variant="dark">
                <a href={Data.infoLink} className="Anchor">more info</a>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

Details.propTypes = {
  Data: PropTypes.object.isRequired,
  CloseEv: PropTypes.func.isRequired,
};

export default Details;
