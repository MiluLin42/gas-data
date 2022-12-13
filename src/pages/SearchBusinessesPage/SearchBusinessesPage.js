import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Div, Text, Icon } from "atomize";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import {
  selectBusinesses,
  searchBusiness,
  selectIsLoading,
  cleanBusinesses,
} from "../../redux/reducers/businessReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import BusinessList from "../../Components/BusinessSystem/BusinessList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const AddBusiness = styled(Link)`
  cursor: pointer;
  margin-left: 1rem;
`;

export default function MembersPage() {
  let { keyword } = useParams();
  const businesses = useSelector(selectBusinesses);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    if (user === "non-login") {
      dispatch(setErrorMessage("請先登入!"));
      dispatch(setShowWarningNotification(true));
      return navigate("/");
    }
    window.scroll(0, 0);
    dispatch(searchBusiness(keyword));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return () => {
      dispatch(cleanBusinesses());
      dispatch(setErrorMessage(null));
    };
  }, [keyword, user, dispatch]);

  const search = () => {
    if (!searchContent) {
      return;
    }
    navigate(`/businesses/search/${searchContent}`);
    setSearchContent("");
  };

  return (
    <Div
      w="80%"
      minH={isLoading ? "150rem" : "50rem"}
      m={{ y: "4rem", x: "auto" }}
      p={{ xs: "1rem", lg: "3rem", b: { lg: "6rem" } }}
      position="relative"
    >
      {isLoading && <LoadingPage />}
      <Div>
        <Div d="flex" m={{ b: "1rem" }}>
          <Text textSize="display1">生意攤資料</Text>
          <AddBusiness to={`/business`}>
            <Icon name="Add" size="40px" color="info600" />
          </AddBusiness>
        </Div>
        <Div m={{ b: "1rem" }}>
          <SearchBar
            searchContent={searchContent}
            setSearchContent={setSearchContent}
            search={search}
          />
        </Div>
        {!businesses || businesses.length === 0 ? (
          <Text
            textColor="warning700"
            textSize="title"
            textWeight="700"
            textAlign="center"
          >
            查無資料…
          </Text>
        ) : (
          <BusinessList businesses={businesses} />
        )}
      </Div>
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
