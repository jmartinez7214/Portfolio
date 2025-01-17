import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/course";

import "./AddEditCourseForm.scss";

export default function AddEditCourseForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    course ? setCourseData(course) : setCourseData({});
  }, [course]);

  const addCourse = (e) => {
    e.preventDefault();

    if (!courseData.idCourse) {
      notification["error"]({
        message: "Course ID is required.",
      });
    } else {
      const accessToken = getAccessTokenApi();

      addCourseApi(accessToken, courseData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";

          notification[typeNotification]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Server error, try later.",
          });
        });
    }
  };

  const updateCourse = (e) => {
    e.preventDefault();

    const accessToken = getAccessTokenApi();

    updateCourseApi(accessToken, course._id, courseData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Server error, try later.",
        });
      });
  };

  return (
    <div className="add-edit-course-form">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        courseData={courseData}
        setCourseData={setCourseData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { course, addCourse, updateCourse, courseData, setCourseData } = props;

  return (
    <Form
      className="form-add-edit"
      onSubmit={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="Course ID"
          value={courseData.idCourse}
          onChange={(e) =>
            setCourseData({ ...courseData, idCourse: e.target.value })
          }
          disabled={course ? true : false}
        />
      </Form.Item>

      <Form.Item>
        <Input
          prefix={<Icon type="link" />}
          placeholder="Course URL"
          value={courseData.link}
          onChange={(e) =>
            setCourseData({ ...courseData, link: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Input
          prefix={<Icon type="gift" />}
          placeholder="Discount coupon"
          value={courseData.coupon}
          onChange={(e) =>
            setCourseData({ ...courseData, coupon: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Input
          prefix={<Icon type="dollar" />}
          placeholder="Price"
          value={courseData.price}
          onChange={(e) =>
            setCourseData({ ...courseData, price: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {course ? "Update course" : "Create course"}
        </Button>
      </Form.Item>
    </Form>
  );
}
