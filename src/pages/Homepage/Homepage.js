import React from "react";
import { Div } from "atomize";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const Homepage = () => {
  return (
    <Div d="flex" align="center" justify="center">
      <Div
        bgImg={[require("../../Image/gas.jpg")]}
        alt="gas"
        bgSize="cover"
        bgPos="center"
        h={{ xs: "30rem", md: "40rem" }}
        w={{ xs: "26rem", md: "60rem" }}
        m={{ b: "3rem" }}
      />
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
};

export default Homepage;
