import React from "react";
import { Row, Col, Icon } from "antd";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col>
        <h3>Navigation</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="www.google.com">
          <Icon type="book" /> Online Courses
        </a>
      </li>
      <li>
        <a href="www.google.com">
          <Icon type="code" /> Web Development
        </a>
      </li>
      <li>
        <a href="www.google.com">
          <Icon type="database" /> Database
        </a>
      </li>
      <li>
        <a href="www.google.com">
          <Icon type="right" /> Private Policy
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="www.google.com">
          <Icon type="hdd" /> Systems / Servers
        </a>
      </li>
      <li>
        <a href="www.google.com">
          <Icon type="appstore" /> CMS
        </a>
      </li>
      <li>
        <a href="www.google.com">
          <Icon type="user" /> Portfolio
        </a>
      </li>
      <li>
        <a href="www.google.com">
          <Icon type="right" /> Cookies Policies
        </a>
      </li>
    </ul>
  );
}
