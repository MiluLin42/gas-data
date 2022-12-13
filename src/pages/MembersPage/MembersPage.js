import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Div, Text, Icon } from "atomize";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import {
  getMembers,
  selectMembers,
  selectIsLoading,
  selectTotalPages,
  cleanMembers,
} from "../../redux/reducers/memberReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import {
  selectErrMessage,
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import MemberList from "../../Components/MemberSystem/MemberList";
import PaginationButton from "../../Components/PaginationButton";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const AddMember = styled(Link)`
  cursor: pointer;
  margin-left: 1rem;
`;

export default function MembersPage() {
  const members = useSelector(selectMembers);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const errMessage = useSelector(selectErrMessage);
  const [page, setPage] = useState(1);
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
      getMembers({
        limit,
        page,
      })
    );
    return () => {
      dispatch(cleanMembers());
      dispatch(setErrorMessage(null));
    };
  }, [user, page, dispatch]);

  return (
    <Div
      w="80%"
      minH={isLoading ? "150rem" : "60rem"}
      m={{ y: "4rem", x: "auto" }}
      p={{ xs: "1rem", lg: "3rem", b: { lg: "6rem" } }}
      pos="relative"
    >
      {isLoading && <LoadingPage />}
      <Div>
        <Div d="flex" m={{ b: "1rem" }}>
          <Text textSize="display1">會員資料列表</Text>
          <AddMember to={`/member`}>
            <Icon name="Add" size="40px" color="info600" />
          </AddMember>
        </Div>
        <MemberList members={members} />
      </Div>
      <PaginationButton totalPages={totalPages} page={page} setPage={setPage} />
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
