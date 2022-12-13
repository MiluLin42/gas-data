import React from "react"
import { Div, Notification, Icon } from "atomize"
import PropTypes from "prop-types"

function SyncWarningNotification({
  showWarning,
  setShowWarning,
  warningMessage,
}) {
  return (
    <Div pos="fixed" top="50%" right="50%" transform="translateX(50%)">
      <Notification
        isOpen={showWarning}
        bg="warning300"
        textColor="warning800"
        pos="static"
        top="0"
        right="0"
        w="12rem"
        textAlign="center"
        border="2px solid"
        borderColor="warning800"
        onClose={() => setShowWarning(false)}
        prefix={
          <Icon
            name="AlertSolid"
            color="warning800"
            size="18px"
            m={{ r: "0.5rem" }}
          />
        }
      >
        {warningMessage}
      </Notification>
    </Div>
  )
}

SyncWarningNotification.propTypes = {
  showWarning: PropTypes.bool,
  setShowWarning: PropTypes.func,
  warningMessage: PropTypes.string,
}

export default SyncWarningNotification
