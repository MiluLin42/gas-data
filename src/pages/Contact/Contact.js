import React from "react";
import { Div, Text } from "atomize";

const Contact = () => {
  return (
    <Div d="flex" align="center" justify="center">
      <Div
        textSize="heading"
        textColor="info800"
        textAlign="center"
        fontFamily="code"
        m="6rem"
        p="1rem"
        border="2px solid"
        rounded="lg"
        borderColor="info600"
        w="30rem"
        h="18rem"
        bg="warning300"
      >
        <Text textSize="heading" textWeight="700">
          聯絡電話
        </Text>
        <Div textColor="brand700">
          <Text>05-2213320</Text>
          <Text>05-2215790</Text>
        </Div>
        <Div
          textSize="heading"
          textWeight="700"
          p={{ t: "1rem" }}
          m={{ t: "1rem" }}
          border={{ t: "2px solid" }}
          borderColor="info900"
        >
          和泰熱水器
        </Div>
        <Div textColor="brand700">
          <Text>0921-015-608</Text>
        </Div>
      </Div>
    </Div>
  );
};

export default Contact;
