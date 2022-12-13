import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/reducers/userReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import { Row, Col, Div, Text } from "atomize";
import InputField from "../../Components/InputField";
import SignUpButtons from "../../Components/UserSystem/SignUpButtons";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const SignInInfo = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((store) => store.users.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      dispatch(setErrorMessage("請填入帳號及密碼"));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setErrorMessage(null));
    dispatch(login(username, password)).then((user) => {
      if (user && user.id) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  return (
    <Div w="100%">
      <Text textSize="heading" textColor="gray900" m={{ b: "3rem" }}>
        登入 Sign In
      </Text>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <InputField
          name="帳號"
          type="text"
          value={username}
          handleEvent={(e) => setUsername(e.target.value)}
          placeholder="請輸入帳號"
        />
        <InputField
          name="密碼"
          type="password"
          value={password}
          handleEvent={(e) => setPassword(e.target.value)}
          placeholder="請輸入密碼"
        />
        <SignUpButtons
          handleEvent={() => navigate.goBack()}
          isLoading={isLoading}
        />
      </form>
    </Div>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user && user !== "non-login") {
      return navigate("/");
    }
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [user]);

  return (
    <Div minH="calc(100vh - 330px)">
      <Row w={{ xs: "100%", md: "70%" }} h="30rem" m="3rem auto" p="1rem">
        <Col size={{ xs: "8", md: "6" }} d="flex" align="center" p="0">
          <SignInInfo></SignInInfo>
        </Col>
      </Row>
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
};

export default SignIn;
