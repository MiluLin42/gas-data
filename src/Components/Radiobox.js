import React from "react";
import PropTypes from "prop-types";
import { Radiobox, Label, Div } from "atomize";

export default function CustomRaios({ isRequest, handleEvent }) {
  return (
    <Div d={{ xs: "flex" }}>
      <Label align="center" textWeight="600">
        <Radiobox
          value={1}
          onChange={handleEvent}
          checked={isRequest}
          inactiveColor="info400"
          activeColor="info700"
          size="22px"
        />
        是
      </Label>
      <Label align="center" textWeight="600" m={{ l: "0.5rem" }}>
        <Radiobox
          value={0}
          onChange={handleEvent}
          checked={!isRequest}
          inactiveColor="danger400"
          activeColor="danger700"
          size="22px"
        />
        否
      </Label>
    </Div>
  );
}

CustomRaios.propTypes = {
  isRequest: PropTypes.boolean,
  handleEvent: PropTypes.function,
};
