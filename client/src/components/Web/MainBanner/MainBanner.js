import React from "react";
import { Row, Col } from "antd";

import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />

      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <h2>
            Learn new <br /> tecnologies web and mobile.
          </h2>
          <h3>
            Through out courses, created by <br />
            profesionals with years of experience.
          </h3>
        </Col>
        <Col lg={4} />
      </Row>
    </div>
  );
}
