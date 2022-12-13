import React from "react"
import { Div, Notification, Icon } from "atomize"
import PropTypes from "prop-types"

function SyncSuccessNotification({
  showSuccess,
  setShowSuccess,
  successMessage,
}) {
  return (
    <Div pos="fixed" top="50%" right="50%" transform="translateX(50%)">
      <Notification
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false)
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
  )
}

SyncSuccessNotification.propTypes = {
  showSuccess: PropTypes.bool,
  setShowSuccess: PropTypes.func,
  successMessage: PropTypes.string,
}

export default SyncSuccessNotification
