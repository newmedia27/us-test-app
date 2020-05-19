import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Row, Col, Alert } from "antd";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import styles from "./user.module.css";
import Spinner from "../spinner";
import Image from "../shared/image";
import { userSelector, getUserRequest } from "../../reducers/user";
import { resetState } from "../../reducers/user";

const prepareDate = (date) => {
  const newDate = new Date(date);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(newDate);
  return 0 || `${day}/${month}/${year}`;
};

const User = ({ match }) => {
  const [draw, setDraw] = useState(false);
  const { username } = match.params;
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(userSelector);

  const getUser = useCallback(() => {
    dispatch(getUserRequest(username));
  }, [dispatch, username]);

  useEffect(() => {
    getUser();
    return () => dispatch(resetState());
  }, [dispatch,getUser]);

  return (
    <Layout>
      <Layout.Content className={styles.content}>
        {loading && <Spinner />}
        {error && (
          <Alert message="Error" description={error} type="error" showIcon />
        )}
        {user && (
          <Row>
            <Col className={styles.list} span={14} offset={5}>
              <Row className={styles.main}>
                <Col span={24} style={{ display: "flex" }}>
                  <Image
                    width={120}
                    height={120}
                    circle
                    className={styles.image}
                    src={user.avatar_url}
                  />
                  <div className={styles.text_block}>
                    <span onClick={() => setDraw(!draw)}>{user.name}</span>
                    <span>{user.company}</span>
                    <span>{prepareDate(user.created_at)}</span>
                  </div>
                </Col>
              </Row>
              <Row
                className={ClassNames(styles.draw, {
                  [styles.draw_active]: draw,
                })}
              >
                <Col span={24}>
                  <span>blog: </span>
                  {user.blog}
                </Col>
                <Col span={24}>
                  <span>location: </span>
                  {user.location}
                </Col>
                <Col span={24}>
                  <span>email:</span>
                  {user.email}
                </Col>
                <Col span={24}>
                  <span>public repos: </span>
                  {user.public_repos}
                </Col>
                <Col span={24}>
                  <span>public gists: </span>
                  {user.public_gists}
                </Col>
                <Col span={24}>
                  <span>following: </span>
                  {user.following}
                </Col>
                <Col span={24}>
                  <span>followers: </span>
                  {user.followers}
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Layout.Content>
    </Layout>
  );
};

User.propTypes = {
  match: PropTypes.object.isRequired,
};

export default User;
