import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Div, Notification, Icon } from "atomize";
import { setShowSuccessNotification } from "../../../redux/reducers/notificationReducer";

const SuccessNotification = () => {
  const dispatch = useDispatch();
  const showSuccess = useSelector((store) => store.notifications.showSuccess);
  const successMessage = useSelector(
    (store) => store.notifications.successMessage
  );
  return (
    <Div pos="fixed" top="50%" right="50%" transform="translateX(50%)">
      <Notification
        isOpen={showSuccess}
        onClose={() => {
          dispatch(setShowSuccessNotification(false));
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          });
        }}
        bg="success300"
        textColor="success800"
        pos="static"
        top="0"
        right="0"
        w="12rem"
        textAlign="center"
        border="2px solid"
        borderColor="success800"
        prefix={
          <Icon
            name="Success"
            color="success800"
            size="18px"
            m={{ r: "0.5rem" }}
          />
        }
      >
        {successMessage}
      </Notification>
    </Div>
  );
};

export default SuccessNotification;
