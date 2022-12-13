import React, { useState } from "react";
import PropTypes from "prop-types";
import { Div, Anchor } from "atomize";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
import { selectUser, selectIsLoading } from "../redux/reducers/userReducer";
import LoadingPage from "../pages/LoadingPage";
import SearchBar from "../Components/SearchBar/SearchBar";
import SyncSuccessNotification from "./Notifications/SyncSuccessNotification";

const Button = ({ name, link, logoutEvent }) => {
  return (
    <Div w={{ xs: "50%", sm: "25%" }} textAlign="center">
      <Anchor
        href={link}
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="subheader"
        bg="transparent"
        textColor="info800"
        textWeight="600"
        hoverTextColor="warning800"
        onClick={() => name === "登出" && logoutEvent()}
      >
        {name}
      </Anchor>
    </Div>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  logoutEvent: PropTypes.func,
};

const NavbarButtons = () => {
  return (
    <Div
      d="flex"
      flexDir={{ xs: "column", md: "row" }}
      justify={{ sm: "center" }}
      align="center"
      w={{ sm: "100%", md: "30rem" }}
      m={{ t: "1rem" }}
    >
      <Button name="會員資料" link="#/members" />
      <Button name="商家資料" link="#/businesses" />
      <Button name="聯絡資訊" link="#/contact" />
    </Div>
  );
};

const UserButtons = ({ user, logoutEvent }) => {
  return (
    <Div
      d="flex"
      flexDir={{ xs: "column", md: "row" }}
      justify={{ sm: "center", md: "flex-end" }}
      align="center"
      w={{ xs: "100%", md: "30rem" }}
      m={{ t: "1rem" }}
    >
      {user && user === "non-login" && <Button name="登入" link="#/signin" />}
      {user && user !== "non-login" && (
        <Button name="登出" logoutEvent={logoutEvent} />
      )}
    </Div>
  );
};

UserButtons.propTypes = {
  user: PropTypes.object,
  logoutEvent: PropTypes.func,
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const logoutEvent = () => {
    dispatch(logout());
    setShowSuccess(true);
    navigate(`/`);
  };

  const search = () => {
    if (!searchContent) {
      return;
    }
    navigate(`/members/search/${searchContent}`);
    setSearchContent("");
  };

  return (
    <Div
      d={{ xs: "block", md: "flex" }}
      m={{ t: "1.5rem", b: "3rem", x: "1.5rem" }}
      p={{ y: "1.5rem", x: "2rem" }}
      align="center"
      justify="space-between"
      border={{ b: "2px solid" }}
      bg="warning500"
      borderColor="warning800"
      shadow="3"
    >
      {isLoading && <LoadingPage />}
      <Div>
        <SearchBar
          searchContent={searchContent}
          setSearchContent={setSearchContent}
          search={search}
        />
      </Div>
      <NavbarButtons />
      <UserButtons user={user} logoutEvent={logoutEvent} />
      <SyncSuccessNotification
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        successMessage={`已登出`}
      />
    </Div>
  );
};

export default Navbar;
