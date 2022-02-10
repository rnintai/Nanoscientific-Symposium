import React from "react";
import InnerHTML from "dangerously-set-html-content";
import useHTML from "hooks/useHTML";
import Loading from "components/Loading/Loading";
import usePageViews from "hooks/usePageViews";

const Landing = () => {
  const pathname = usePageViews();

  const [HTML, loading] = useHTML(`/api/page${pathname}/landing`);
  if (loading) {
    return <Loading />;
  }
  return <InnerHTML html={HTML} />;
};

export default Landing;
