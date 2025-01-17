import React, { useState, useEffect } from "react";
import { Spin, notification } from "antd";
import { Helmet } from "react-helmet";
import moment from "moment";
import { getPostApi } from "../../../../api/post";
import "moment/locale/en-gb";

import "./PostInfo.scss";

export default function PostInfo(props) {
  const { url } = props;
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    getPostApi(url)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPostInfo(response.post);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Server error, try later.",
        });
      });
  }, [url]);

  if (!postInfo) {
    return <Spin tip="Loading" style={{ width: "100%", padding: "200px 0" }} />;
  }

  return (
    <>
      <Helmet>
        <title>{postInfo.title} | Jose Martinez</title>
      </Helmet>
      <div className="post-info">
        <h1 className="post-info__title">{postInfo.title}</h1>
        <div className="post-info__creation-date">
          {moment(postInfo.date).local("en-gb").format("LL")}
        </div>

        <div
          className="post-info__description"
          dangerouslySetInnerHTML={{ __html: postInfo.description }}
        />
      </div>
    </>
  );
}
