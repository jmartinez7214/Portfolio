import React from "react";
import { Row, Col, Card, Icon } from "antd";

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className="how-my-courses-work">
      <Col lg={24} className="how-my-courses-work__title">
        <h2>How my courses work?</h2>
        <h3>
          Each course count with content below the web Udemy, active 24/7 all
          365 days of the year
        </h3>
      </Col>

      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon="clock-circle"
              title="Courses and clases"
              subtitle="Description"
            />
          </Col>
          <Col md={8}>
            <CardInfo icon="key" title="24/7 access" subtitle="Description" />
          </Col>
          <Col md={8}>
            <CardInfo
              icon="message"
              title="Collaborative learning"
              subtitle="Description"
            />
          </Col>
        </Row>

        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon="user"
              title="Improve your profile"
              subtitle="Description"
            />
          </Col>
          <Col md={8}>
            <CardInfo icon="dollar" title="Low prices" subtitle="Description" />
          </Col>
          <Col md={8}>
            <CardInfo
              icon="check-circle"
              title="Certificate of completion"
              subtitle="Description"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function CardInfo(props) {
  const { icon, title, subtitle } = props;
  const { Meta } = Card;

  return (
    <Card className="how-my-courses-work__card">
      <Icon type={icon} />
      <Meta title={title} description={subtitle} />
    </Card>
  );
}
