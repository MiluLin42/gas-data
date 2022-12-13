import React from "react";
import PropTypes from "prop-types";
import { Div, Input, Icon } from "atomize";

const SearchBar = ({ searchContent, setSearchContent, search }) => {
  return (
    <Div d="flex" align="center" w={{ xs: "100%", md: "30rem" }}>
      <Input
        value={searchContent}
        onChange={(e) => {
          setSearchContent(e.target.value);
        }}
        onKeyPress={(e) => e.key === "Enter" && search()}
        placeholder="請輸入電話或地址"
        suffix={
          <Icon
            name="Search"
            size="20px"
            cursor="pointer"
            onClick={() => search()}
            pos="absolute"
            top="25%"
            right="1rem"
          />
        }
      />
    </Div>
  );
};

SearchBar.propTypes = {
  searchContent: PropTypes.string,
  setSearchContent: PropTypes.function,
  search: PropTypes.function,
};

export default SearchBar;
