import React from "react";
import { Div, Button, Icon, Input } from "atomize";
import PropTypes from "prop-types";

const PaginationButton = ({ setPage, page, totalPages }) => {
  const handlePageClick = (type) => {
    if (type === "first") {
      setPage(1);
    }
    if (type === "back") {
      setPage(Number(page) - 1);
    }
    if (type === "next") {
      setPage(Number(page) + 1);
    }
    if (type === "last") {
      setPage(totalPages);
    }
  };

  return (
    <Div
      pos="absolute"
      left="50%"
      bottom={{ xs: "-5rem", lg: "0rem" }}
      transform="translate(-50%, -50%)"
    >
      {totalPages !== 0 && (
        <Div d="flex" align="center">
          {page === 1 ? (
            ""
          ) : (
            <>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("first")}
              >
                <Icon name="Back" size="20px" color="info700" />
              </Button>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("back")}
              >
                <Icon name="LeftArrow" size="20px" color="info700" />
              </Button>
            </>
          )}

          <Div
            p={{ x: "0.5rem" }}
            textSize={{ xs: "subheader", lg: "title" }}
            textColor="info700"
            style={{ whiteSpace: "nowrap" }}
            d="flex"
          >
            <Input
              rounded="sm"
              value={page}
              textAlign="center"
              onChange={(e) => {
                setPage(e.target.value);
              }}
              min={1}
              max={totalPages}
              w="4rem"
              title={`請輸入 1~${totalPages && totalPages} 內的數字`}
              m={{ t: "-0.3rem" }}
            />
            ／ {totalPages} 頁
          </Div>

          {page === totalPages ? (
            ""
          ) : (
            <>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("next")}
              >
                <Icon name="RightArrow" size="20px" color="info700" />
              </Button>
              <Button
                h={{ xs: "1rem", lg: "2rem" }}
                w={{ xs: "1rem", lg: "2rem" }}
                p={{ xs: { x: "1.5rem" }, lg: { x: "2rem" } }}
                textSize="caption"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                m={{ x: "0.5rem" }}
                onClick={() => handlePageClick("last")}
              >
                <Icon name="Next" size="20px" color="info700" />
              </Button>
            </>
          )}
        </Div>
      )}
    </Div>
  );
};

PaginationButton.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
};

export default PaginationButton;
