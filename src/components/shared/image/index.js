import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import style from "./image.module.css";

const Image = ({ className, src, alt, width, height, circle, ...args }) => {
  const classes = classNames(style.image, className, {
    [style.circle]: circle,
  });
  if (!src) {
    src = `https://via.placeholder.com/${width}x${height}`;
  }
  return (
    <img
      {...args}
      className={classes}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

Image.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
  circle: PropTypes.bool,
};
Image.defaultProps = {
  className: "",
  src: "",
  alt: "",
  width: null,
  height: null,
  circle: false,
};

export default Image;
