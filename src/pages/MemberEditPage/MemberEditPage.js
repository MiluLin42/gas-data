import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Div, Text, Button } from "atomize";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import InputField from "../../Components/InputField";
import RadioBox from "../../Components/Radiobox";
import {
  getMember,
  selectIsLoading,
  cleanMember,
  updateMember,
  selectMember,
} from "../../redux/reducers/memberReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";

const BackButton = styled(Link)`
  text-decoration: none;
`;

export default function MemberEditPage() {
  const { id } = useParams();
  const [telephone, setTelephone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [frequency, setFrequency] = useState("");
  const [isRequest, setIsRequest] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const member = useSelector(selectMember);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === "non-login") {
      dispatch(setErrorMessage("請先登入!"));
      dispatch(setShowWarningNotification(true));
      return navigate("/");
    }
    window.scroll(0, 0);
    dispatch(getMember(id));
    return () => {
      dispatch(cleanMember());
    };
  }, [user, id, dispatch]);

  useEffect(() => {
    if (member && user) {
      if (member.telephone) setTelephone(member.telephone);
      if (member.cellphone) setCellphone(member.cellphone);
      if (member.address) setAddress(member.address);
      if (member.remark) setRemark(member.remark);
      if (member.frequency) setFrequency(member.frequency);
      if (member.isRequest) setIsRequest(member.isRequest);
    }
    return () => dispatch(cleanMember);
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!telephone && !cellphone) {
      dispatch(setErrorMessage("請至少填入一組電話"));
      dispatch(setShowWarningNotification(true));
      return;
    }
    if (!address) {
      dispatch(setErrorMessage("請填入完整資料"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    dispatch(setErrorMessage(null));
    dispatch(
      updateMember(id, {
        telephone,
        cellphone,
        address,
        remark,
        frequency,
        isRequest,
      })
    ).then((res) => {
      if (res.ok === 1) {
        setTimeout(() => {
          navigate("/members");
        }, 1000);
      }
    });
  };

  const handleEvent = (e) => {
    const targetValue = Number(e.target.value);
    if (targetValue === 0) {
      setIsRequest(Number(e.target.value));
    }
    if (targetValue === 1) {
      setIsRequest(Number(e.target.value));
    }
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
        <Text textSize="display1">編輯會員資料</Text>
        <Div>
          <Div justify="center">
            <form onSubmit={handleSubmit}>
              <InputField
                name="電話"
                type="text"
                value={telephone}
                handleEvent={(e) => setTelephone(e.target.value)}
                placeholder="請輸入電話"
              />
              <InputField
                name="手機"
                type="text"
                value={cellphone}
                handleEvent={(e) => setCellphone(e.target.value)}
                placeholder="請輸入手機"
              />
              <InputField
                name="地址"
                type="text"
                value={address}
                handleEvent={(e) => setAddress(e.target.value)}
                placeholder="請輸入地址"
                required={true}
              />
              <InputField
                name="備註"
                type="text"
                value={remark}
                handleEvent={(e) => setRemark(e.target.value)}
                placeholder="備註事項"
              />
              <InputField
                name="頻率"
                type="text"
                value={frequency}
                handleEvent={(e) => setFrequency(e.target.value)}
                placeholder="叫瓦斯的日期"
              />
              <Div
                d="flex"
                flexDir={{ xs: "column", md: "row" }}
                align={{ xs: "flex-start", md: "center" }}
                w="100%"
                m={{ b: "0.5rem" }}
              >
                <Div
                  textSize="subheader"
                  w={"7rem"}
                  textAlign={{ xs: "left", md: "justify" }}
                  style={{ textAlignLast: "justify" }}
                  pos="relative"
                  m={{ r: "1rem" }}
                >
                  要求
                </Div>
                <RadioBox
                  value={isRequest}
                  type="boolean"
                  handleEvent={handleEvent}
                  isRequest={isRequest}
                  setIsRequest={setIsRequest}
                />
              </Div>
              <Div d="flex" m={{ t: "1rem" }}>
                <Button
                  h="2.5rem"
                  p={{ x: "1rem" }}
                  textSize="body"
                  textColor="info800"
                  textWeight="600"
                  hoverTextColor="info900"
                  bg="info300"
                  hoverBg="info400"
                  m={{ l: "0.5rem" }}
                  handleSubmit={handleSubmit}
                >
                  確認
                </Button>
                <BackButton to={`/members`}>
                  <Button
                    h="2.5rem"
                    p={{ x: "1rem" }}
                    textSize="body"
                    textColor="brand800"
                    textWeight="600"
                    hoverTextColor="brand900"
                    bg="brand300"
                    hoverBg="brand600"
                    m={{ l: "2rem" }}
                  >
                    取消
                  </Button>
                </BackButton>
              </Div>
            </form>
          </Div>
        </Div>
      </Div>
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
