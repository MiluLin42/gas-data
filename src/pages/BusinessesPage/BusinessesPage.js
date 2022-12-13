import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Div, Text, Icon } from "atomize";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import {
  getBusinesses,
  selectBusinesses,
  selectIsLoading,
  selectTotalPages,
  cleanBusinesses,
} from "../../redux/reducers/businessReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import {
  selectErrMessage,
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import BusinessList from "../../Components/BusinessSystem/BusinessList";
import PaginationButton from "../../Components/PaginationButton";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const AddBusiness = styled(Link)`
  cursor: pointer;
  margin-left: 1rem;
`;

export default function BusinessesPage() {
  const businesses = useSelector(selectBusinesses);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const errMessage = useSelector(selectErrMessage);
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const limit = 10;

  useEffect(() => {
    if (
      user === "non-login" ||
      errMessage === "TokenExpiredError: jwt expired"
    ) {
      dispatch(setErrorMessage("請先登入!"));
      dispatch(setShowWarningNotification(true));
      return navigate("/");
    }
    window.scroll(0, 0);
    dispatch(
      getBusinesses({
        limit,
        page,
      })
    );
    return () => {
      dispatch(cleanBusinesses());
      dispatch(setErrorMessage(null));
    };
  }, [user, page, dispatch]);

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
      pos="relative"
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
        <BusinessList businesses={businesses} />
      </Div>
      <PaginationButton totalPages={totalPages} page={page} setPage={setPage} />
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
