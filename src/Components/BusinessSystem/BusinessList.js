import React from "react";
import PropTypes from "prop-types";
import { Div, Button } from "atomize";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Table = styled.table`
  padding: 2rem;
  border: 1px solid;
  border-radius: 5px;
  & tbody:nth-child(odd) {
    background: #ececff;
  }

  @media screen and (max-width: 768px) {
    border: 0;
    & td:nth-child(odd) {
      background: #ececff;
    }
    & tbody:nth-child(odd) {
      background: white;
    }
    & td {
      position: relative;
      display: block;
      text-align: right;
      min-height: 3rem;
      padding-left: 3.5rem;
    }
    & td::before {
      position: absolute;
      left: 1rem;
      content: attr(data-label);
      font-weight: bold;
      color: #0066ff;
    }
  }
`;

const Td = styled.td`
  border: 1px solid;
  padding: 1rem;
  ${(props) =>
    props.$noWrap &&
    `
    white-space: nowrap;
  `}
  @media screen and (max-width: 768px) {
    display: block;
    &:nth-child(1) {
      border-radius: 5px 5px 0 0;
    }
    &:nth-child(8) {
      border-radius: 0 0 5px 5px;
    }
  }
`;

const Tr = styled.tr`
  @media screen and (max-width: 768px) {
    display: block;
    margin-bottom: 3rem;
  }
`;

const Thead = styled.thead`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BusinessEditButton = styled(Link)`
  text-decoration: none;
`;

const BusinessList = ({ businesses }) => {
  return (
    <Div minW="80%">
      <Div d="flex" justify="center">
        <Table>
          <Thead>
            <Tr>
              <Td>ID</Td>
              <Td>電話</Td>
              <Td>手機</Td>
              <Td>店名</Td>
              <Td>地址</Td>
              <Td>備註</Td>
              <Td>價格</Td>
              <Td>／</Td>
            </Tr>
          </Thead>

          {businesses &&
            businesses.map((business) => (
              <tbody key={business.id}>
                <Tr>
                  <Td data-label="ID">{business && business.id}</Td>
                  <Td data-label="電話" $noWrap={true}>
                    {business && business.telephone}
                  </Td>
                  <Td data-label="手機" $noWrap={true}>
                    {business && business.cellphone}
                  </Td>
                  <Td data-label="店名">{business && business.store_name}</Td>
                  <Td data-label="店址">
                    {business && business.store_address}
                  </Td>
                  <Td data-label="備註">{business && business.remark}</Td>
                  <Td data-label="價格" $noWrap={true}>
                    {business && business.price}
                  </Td>
                  <Td data-label="編輯">
                    <BusinessEditButton
                      to={`/businesses/update/${business.id}`}
                    >
                      <Div d={{ xs: "flex" }} justify={{ xs: "flex-end" }}>
                        <Button
                          h="2.5rem"
                          p={{ x: "1rem" }}
                          textSize="body"
                          textColor="info800"
                          textWeight="600"
                          hoverTextColor="info900"
                          bg="info300"
                          hoverBg="info400"
                          m={{ l: "0.5rem" }}
                        >
                          編輯
                        </Button>
                      </Div>
                    </BusinessEditButton>
                  </Td>
                </Tr>
              </tbody>
            ))}
        </Table>
      </Div>
    </Div>
  );
};

BusinessList.propTypes = {
  businesses: PropTypes.object,
};

export default BusinessList;
