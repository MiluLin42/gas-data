import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { Div, Text, Icon } from "atomize";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import {
  selectMembers,
  searchMembers,
  selectIsLoading,
  cleanMembers,
} from "../../redux/reducers/memberReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import {
  selectErrMessage,
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import MemberList from "../../Components/MemberSystem/MemberList";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const AddMember = styled(Link)`
  cursor: pointer;
  margin-left: 1rem;
`;

export default function MembersPage() {
  let { keyword } = useParams();
  const members = useSelector(selectMembers);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const errMessage = useSelector(selectErrMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(searchMembers(keyword));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return () => {
      dispatch(cleanMembers());
      dispatch(setErrorMessage(null));
    };
  }, [keyword, user, dispatch]);

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
          <Text textSize="display1">會員資料</Text>
          <AddMember to={`/member`}>
            <Icon name="Add" size="40px" color="info600" />
          </AddMember>
        </Div>
        {!members || members.length === 0 ? (
          <Text
            textColor="warning700"
            textSize="title"
            textWeight="700"
            textAlign="center"
          >
            查無資料…
          </Text>
        ) : (
          <MemberList members={members} />
        )}
      </Div>
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
