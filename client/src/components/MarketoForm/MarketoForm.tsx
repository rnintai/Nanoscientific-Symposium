import React, { useEffect, useState } from "react";

const MarketoForm = (props: { formId: string }) => {
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>(null);
  let intervalCnt = 0;

  // 마케토폼 2개 렌더링 될 시 제거
  useEffect(() => {
    const removeDupForm = () => {
      const styleIndex = [];
      document
        .querySelector(".mktoForm")
        .childNodes.forEach((a: HTMLElement, idx) => {
          if (a.tagName === "STYLE") {
            styleIndex.push(idx);
          }
        });
      if (document.querySelectorAll(".mktoForm style").length > 1) {
        for (let i = 0; i < styleIndex[1]; i += 1) {
          document
            .querySelector(".mktoForm")
            .removeChild(
              document.querySelector(".mktoForm").childNodes[styleIndex[1]],
            );
        }
        setIsRemoved(true);
      }
      intervalCnt += 1;

      if (intervalCnt === 30) {
        setIsRemoved(true);
      }
    };
    setIntervalId(setInterval(removeDupForm, 1000));

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isRemoved) {
      clearInterval(intervalId);
    }
  }, [isRemoved]);

  // eslint-disable-next-line react/destructuring-assignment
  return <form id={`mktoForm_${props.formId}`} className="mktoForm" />;
};

export default MarketoForm;
