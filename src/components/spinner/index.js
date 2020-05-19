import React from "react";
import { Space, Spin } from "antd";
import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
