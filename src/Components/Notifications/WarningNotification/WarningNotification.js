import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Div, Notification, Icon } from "atomize";
import {
  setShowWarningNotification,
  selectErrMessage,
  selectShowWarning,
} from "../../../redux/reducers/notificationReducer";

const WarningNotification = () => {
  const dispatch = useDispatch();
  const errMessage = useSelector(selectErrMessage);
  const showWarning = useSelector(selectShowWarning);

  return (
    <Div pos="fixed" top="50%" right="50%" transform="translateX(50%)">
      <Notification
        isOpen={showWarning}
        bg="warning300"
        textColor="warning800"
        pos="static"
        top="0"
        right="0"
        w="18rem"
        textAlign="center"
        border="2px solid"
        borderColor="warning800"
        onClose={() => dispatch(setShowWarningNotification(false))}
      >
        <Div d="flex" flexDir="column" justify="center" align="center">
          <Div d="flex" justify="center" align="center" textSize="18px">
            <Icon
              name="AlertSolid"
              color="warning800"
              size="18px"
              m={{ r: "1rem" }}
            />
            錯誤
          </Div>
          <Div textSize="18px" m={{ t: "1rem" }}>
            {errMessage}
          </Div>
        </Div>
      </Notification>
    </Div>
  );
};

export default WarningNotification;
