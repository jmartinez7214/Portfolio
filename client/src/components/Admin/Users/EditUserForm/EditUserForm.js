import React, { useCallback, useState, useEffect } from "react";
import {
  Avatar,
  Form,
  Icon,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  updateUserApi,
  uploadAvatarApi,
  getAvatarApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdated = userData;

    if (userUpdated.password || userUpdated.repeatPassword) {
      if (userUpdated.password !== userUpdated.repeatPassword) {
        notification["error"]({
          message: "Passwords must be equal.",
        });
        return;
      } else {
        delete userUpdated.repeatPassword;
      }
    } else {
      delete userUpdated.password;
    }

    if (!userUpdated.firstname || !userUpdated.lastname || !userUpdated.email) {
      notification["error"]({
        message: "Firstname, lastname and email are required.",
      });
      return;
    }

    if (typeof userUpdated.avatar === "object") {
      uploadAvatarApi(token, userUpdated.avatar, user._id).then((response) => {
        userUpdated.avatar = response.avatarName;
        updateUserApi(token, userUpdated, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({ ...userData, password: "", repeatPassword: "" });
        });
      });
    } else {
      updateUserApi(token, userUpdated, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
        setUserData({ ...userData, password: "", repeatPassword: "" });
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpg, image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmit={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Firstname"
              value={userData.firstname}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Lastname"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Select rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrator</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Reviewer</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Repeat Password"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
}
