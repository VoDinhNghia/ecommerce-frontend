import React from "react";
import { Button } from "react-bootstrap";
import { IpropReadMore } from "../../../interfaces/common.interface";

const ReadMoreCommon = (props: IpropReadMore) => {
  const { children, isReadMore, setReadMore, lengthSlice = 30 } = props;
  const text = children;

  return (
    <p className="ReadMoreCommon">
      {!isReadMore && text?.length > lengthSlice
        ? `${text?.slice(0, lengthSlice)}...`
        : text}
      <span onClick={() => setReadMore()}>
        {text.length > lengthSlice ? (
          <Button size="sm" variant="outline-light" className="text-primary">
            {!isReadMore ? "read more" : "show less"}
          </Button>
        ) : null}
      </span>
    </p>
  );
};

export default ReadMoreCommon;
