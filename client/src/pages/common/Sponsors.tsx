import React from "react";
import useHTML from "hooks/useHTML";
import InnerHTML from "dangerously-set-html-content";
import usePageViews from "hooks/usePageViews";
import Loading from "components/Loading/Loading";
import useSeoTitle from "hooks/useSeoTitle";
import { globalData } from "components/NavBar/NavBar";

const Sponsors = () => {
  const pathname = usePageViews();
  const { sponsors } = globalData.get(pathname) as Common.globalDataType;
  useSeoTitle(sponsors as string, pathname);

  const config = {
    params: {
      nation: pathname,
    },
  };
  const [HTML, loading] = useHTML(`/api/page/common/sponsors`);
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default Sponsors;
