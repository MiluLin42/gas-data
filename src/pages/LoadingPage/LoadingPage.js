import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #c7c1c178;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingPage = () => {
  return (
    <Loading>
      <ReactLoading type="cylon" color="#83b1c9" height={80} width={80} />
    </Loading>
  );
};

export default LoadingPage;
