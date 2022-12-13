import React from "react";
import PropTypes from "prop-types";
import { Div, Input } from "atomize";

const InputField = ({
  name,
  type,
  value,
  handleEvent,
  placeholder,
  remind,
  rule,
  required,
  isDisabled,
}) => {
  return (
    <Div d="flex" flexDir="column" m={{ y: "1rem" }}>
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
        >
          {name}
          <Div
            textColor="red"
            m={{ l: "0.5rem" }}
            pos="absolute"
            right="-10px"
            top="0"
          >
            {required && "*"}
          </Div>
        </Div>

        <Div
          w={{ xs: "100%", md: "calc(100% - 7rem)" }}
          m={{ l: { xs: "0", md: "1rem" } }}
        >
          <Input
            type={type}
            value={value}
            pattern={rule || null}
            onChange={handleEvent}
            placeholder={placeholder}
            m={{ t: "0.5rem" }}
            w={{ xs: "100%", md: "100%" }}
            required={required}
            disabled={isDisabled}
            textColor={isDisabled && "disable"}
          />
        </Div>
      </Div>
      <Div
        textSize="14px"
        textColor="gray800"
        m={{ l: { xs: "0", md: "8rem" } }}
      >
        {remind}
      </Div>
    </Div>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleEvent: PropTypes.func,
  placeholder: PropTypes.string,
  remind: PropTypes.string,
  rule: PropTypes.string,
  required: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default InputField;
