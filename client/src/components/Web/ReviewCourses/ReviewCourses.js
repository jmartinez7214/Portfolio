import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import NoAvatar from "../../../assets/img/png/no-avatar.png";

import "./ReviewCourses.scss";

export default function ReviewCourses() {
  return (
    <Row className="review-courses">
      <Row>
        <Col lg={4} />
        <Col lg={16} className="review-courses__title">
          <h2>
            Take part of +35k students that are learning from this courses
          </h2>
        </Col>
        <Col lg={4} />
      </Row>

      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Alonso Campos"
                subtitle="Udemy Student"
                avatar={NoAvatar}
                review="Great course."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="David Ramiro"
                subtitle="Udemy Student"
                avatar={NoAvatar}
                review="Great course."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Valentina Rubio"
                subtitle="Udemy Student"
                avatar={NoAvatar}
                review="Great course."
              />
            </Col>
          </Row>

          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Marc Perez"
                subtitle="Udemy Student"
                avatar={NoAvatar}
                review="Great course."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Jesus Cruz"
                subtitle="Udemy Student"
                avatar={NoAvatar}
                review="Great course."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Francisco Garcia"
                subtitle="Udemy Student"
                avatar={NoAvatar}
                review="Great course."
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} />
      </Row>
    </Row>
  );
}

function CardReview(props) {
  const { name, subtitle, avatar, review } = props;
  const { Meta } = Card;

  return (
    <Card className="review-courses__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      />
    </Card>
  );
}
