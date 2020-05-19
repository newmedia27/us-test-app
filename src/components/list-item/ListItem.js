import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import Image from "../shared/image";
import Button from "../shared/button";
import styles from "./list-item.module.css";

const ListItem = ({ src, name, buttonHref }) => {
  return (
    <Row className={styles.row}>
      <Col span={18}>
        <Link to={`/${name}`}>
          <Image
            width={80}
            height={80}
            circle
            className={styles.image}
            src={src}
          />
        </Link>
        <Link to={`/${name}`}>{name}</Link>
      </Col>
      <Col span={6}>
        <div className={styles.button_block}>
          <Button
            tag="a"
            className={styles.button}
            href={buttonHref}
            target="_blank"
          >
            button
          </Button>
        </div>
      </Col>
    </Row>
  );
};

ListItem.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  buttonHref: PropTypes.string,
};
ListItem.defaultProps = {
  src: '',
  name: '',
  buttonHref: '',
};

export default ListItem;
