import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "components/NavBar/NavBar";

const Landing = () => {
  const pathname = usePageViews();
  const { home } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(home as string, pathname);

  const [HTML, loading] = useHTML(`/api/page/common/landing`);
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default Landing;
