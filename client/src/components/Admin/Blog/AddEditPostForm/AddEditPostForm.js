import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  DatePicker,
  notification,
} from "antd";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/post";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = (e) => {
    e.preventDefault();
    const { title, url, description, date } = postData;

    if (!title || !url || !description || !date) {
      notification["error"]({
        message: "All fields are required.",
      });
    } else {
      if (!post) {
        addPost();
      } else {
        updatePost();
      }
    }
  };

  const addPost = () => {
    const token = getAccessTokenApi();

    addPostApi(token, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Server error, try later.",
        });
      });
  };

  const updatePost = () => {
    const token = getAccessTokenApi();

    updatePostApi(token, post._id, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Server error, try later.",
        });
      });
  };

  return (
    <div className="add-edit-post-form">
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;
  const editorRef = useRef(null);

  return (
    <Form className="add-edit-post-form" layout="inline" onSubmit={processPost}>
      <Row gutter={24}>
        <Col span={8}>
          <Input
            prefix={<Icon type="font-size" />}
            placeholder="Title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<Icon type="link" />}
            placeholder="URL"
            value={postData.url}
            onChange={(e) =>
              setPostData({
                ...postData,
                url: transformTextToUrl(e.target.value),
              })
            }
          />
        </Col>
        <Col span={8}>
          <DatePicker
            style={{ width: "100%" }}
            format="MM/DD/YYYY HH:mm:ss"
            placeholder="Publish date"
            //showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            value={postData.date && moment(postData.date)}
            onChange={(e, value) =>
              setPostData({
                ...postData,
                date: moment(value, "MM/DD/YYYY HH:mm:ss").toISOString(),
              })
            }
          />
        </Col>
      </Row>

      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={postData.description ? postData.description : ""}
        //value={postData.description ? postData.description : ""}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onBlur={(e) =>
          setPostData({ ...postData, description: e.target.getContent() })
        }
      />

      <Button type="primary" htmlType="submit" className="btn-submit">
        {post ? "Update post" : "Create post"}
      </Button>
    </Form>
  );
}

function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}
