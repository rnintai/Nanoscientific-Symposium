import React from "react";
import ProgramsList from "components/Programs/ProgramsList";
import usePageViews from "hooks/usePageViews";

const Programs = () => {
  const pathname = usePageViews();
  return <ProgramsList />;
};

export default Programs;
