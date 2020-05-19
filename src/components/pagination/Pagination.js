import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import styles from "./Pagination.module.css";

const createItems = (currentItem, countItem = 4) => {
  if (currentItem >= countItem) {
    console.log(countItem);
    let items = [];
    const start = currentItem + 1;
    for (let i = countItem - 1; i >= 0; i--) {
      items.push(start - i);
    }
    return items;
  }
  return [1, 2, 3, 4];
};

const Pagination = ({ currentPage, setCurrentPage }) => {
  const [buttonOrder, setButtonOrder] = useState([]);
  useEffect(() => {
    const arr = createItems(currentPage);
    setButtonOrder(arr);
  }, [currentPage]);
  return (
    <div className={styles.container}>
      {buttonOrder.map((button) => (
        <div
          className={ClassNames(styles.button, {
            [styles.active]: button === currentPage,
          })}
          key={button}
          onClick={() => setCurrentPage(button)}
        >
          {button}
        </div>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export default Pagination;
