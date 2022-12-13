import React from "react";
import PropTypes from "prop-types";
import { Div, Button, Icon } from "atomize";

export function SignUpButtons({ handleEvent, isLoading }) {
  return (
    <>
      <Div d="flex" m={{ t: "1rem", b: "1rem" }}>
        <Button
          prefix={
            <Icon
              name="LongLeft"
              size={{ xs: "14px", md: "16px" }}
              color="white"
              m={{ r: { xs: "0.5rem", md: "1rem" } }}
            />
          }
          type="button"
          bg="gray700"
          shadow="1"
          hoverShadow="2"
          onClick={handleEvent}
        >
          返回
        </Button>
        <Button
          suffix={
            <Icon
              name={isLoading ? "Loading" : "LongRight"}
              size="16px"
              color="white"
              m={{ l: { xs: "0.5rem", md: "1rem" } }}
            />
          }
          bg="info700"
          shadow="1"
          hoverShadow="2"
          m={{ l: { xs: "0.5rem", md: "1rem" } }}
        >
          送出
        </Button>
      </Div>
    </>
  );
}

SignUpButtons.propTypes = {
  isLoading: PropTypes.bool,
  handleEvent: PropTypes.func,
};

export default SignUpButtons;
