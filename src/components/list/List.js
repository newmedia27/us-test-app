import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Alert } from "antd";

import { Row, Col } from "antd";
import Pagination from "../pagination/Pagination";
import {
  getUsersRequest,
  listSelector,
  setCurrentPage,
} from "../../reducers/app-reducer";
import styles from "./List.module.css";
import Spinner from "../spinner";

const ListItem = React.lazy(() => import("../list-item/ListItem"));

export default function List() {
  const dispatch = useDispatch();
  const { list, loading, currentPage, error } = useSelector(listSelector);
  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);
  const setPaginate = (paginateItem) => {
    dispatch(setCurrentPage(paginateItem));
  };

  return (
    <Layout>
      <Layout.Content className={styles.content}>
        {loading && <Spinner />}
        {error && (
          <Alert message="Error" description={error} type="error" showIcon />
        )}
        <Row>
          <Col span={14} offset={5} className={styles.list}>
            {!list || !list.length
              ? null
              : list.map((listItem) => (
                  <ListItem
                    key={listItem.id}
                    name={listItem.login}
                    src={listItem.avatar_url}
                    buttonHref={listItem.html_url}
                  />
                ))}
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer>
        <Pagination currentPage={currentPage} setCurrentPage={setPaginate} />
      </Layout.Footer>
    </Layout>
  );
}
