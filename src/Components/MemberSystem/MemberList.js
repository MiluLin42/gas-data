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

const MemberEditButton = styled(Link)`
  text-decoration: none;
`;

const MemberList = ({ members }) => {
  return (
    <Div minW="80%">
      <Div d="flex" justify="center">
        <Table>
          <Thead>
            <Tr>
              <Td>ID</Td>
              <Td>要求</Td>
              <Td>電話</Td>
              <Td>手機</Td>
              <Td>地址</Td>
              <Td>備註</Td>
              <Td>頻率</Td>
              <Td>／</Td>
            </Tr>
          </Thead>

          {members.map((member) => (
            <tbody key={member.id}>
              <Tr>
                <Td data-label="ID">{member && member.id}</Td>
                <Td data-label="要求">
                  <Div
                    textColor="brand800"
                    textSize="display1"
                    justify="center"
                    align="center"
                  >
                    {member && member.isRequest ? "＊" : ""}
                  </Div>
                </Td>
                <Td data-label="電話" $noWrap={true}>
                  {member && member.telephone}
                </Td>
                <Td data-label="手機">{member && member.cellphone}</Td>
                <Td data-label="地址" $noWrap={true}>
                  {member && member.address}
                </Td>
                <Td data-label="備註">{member && member.remark}</Td>
                <Td data-label="頻率">
                  {member && member.frequency
                    ? member.frequency
                    : member.updatedAt.substr(0, 10).split("-").join("/")}
                </Td>
                <Td data-label="編輯">
                  <MemberEditButton to={`/members/update/${member.id}`}>
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
                  </MemberEditButton>
                </Td>
              </Tr>
            </tbody>
          ))}
        </Table>
      </Div>
    </Div>
  );
};

MemberList.propTypes = {
  members: PropTypes.array,
};

export default MemberList;
