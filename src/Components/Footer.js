import React from "react";
import { Div, Text } from "atomize";

const Footer = () => {
  return (
    <Div
      tag="footer"
      bg="black"
      textAlign="center"
      p={{ t: "1.5rem", b: "1rem" }}
      w="100%"
    >
      <Div textSize="paragraph" fontFamily="code" textColor="gray100">
        益興煤氣行
      </Div>
      <Text textSize="tiny" textColor="gray800">
        Copyright © 2022 YiXing Gas All Rights Reserved.
      </Text>
    </Div>
  );
};

export default Footer;
