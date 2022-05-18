/* eslint-disable react/require-default-props */
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

interface linkProps extends React.ComponentPropsWithoutRef<"a"> {
  to: string;
  children: string | JSX.Element;
}

const LinkWithSearch = (props: linkProps) => {
  const { to, children, ...rest } = props;
  const { search } = useLocation();
  const utmKeyList = [
    ...search
      .replace("?", "")
      .split("&")
      .filter((e) => e.indexOf("utm") !== -1)
      .map((e) => e.split("=")[0]),
  ];
  const utmValueList = [
    ...search
      .replace("?", "")
      .split("&")
      .filter((e) => e.indexOf("utm") !== -1)
      .map((e) => e.split("=")[1]),
  ];

  let newSearch = "?";
  utmKeyList.map((k, i) => {
    if (i < utmKeyList.length - 1) newSearch += `${k}=${utmValueList[i]}&`;
    else {
      newSearch += `${k}=${utmValueList[i]}`;
    }
    return null;
  });

  // console.log(searchParams);
  return (
    <Link to={to + newSearch} {...rest}>
      {children}
    </Link>
  );
};

export default LinkWithSearch;
