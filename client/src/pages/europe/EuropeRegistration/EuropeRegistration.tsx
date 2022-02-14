import React, { useEffect } from "react";
// import InnerHTML from "dangerously-set-html-content";
// import useHTML from "hooks/useHTML";
// import Loading from "components/Loading/Loading";
import { RegistrationContainer } from "./EuropeRegistrationStyles";

const EuropeRegistration = () => {
  // const [HTML, loading] = useHTML("/api/page/europe/registration");
  // if (loading) {
  //   return <Loading />;
  // }
  useEffect(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm("//pages.parksystems.com", "988-FTP-549", 1065);
  }, []);

  useEffect(() => {
    document.getElementById("mktoForm_1071")?.addEventListener("submit", () => {
      console.log("submitted");
    });
    // document.querySelector(".mktoButton")?.addEventListener("click", () => {
    //   console.log("asd");
    // });
  }, [document.querySelector(".mktoButton")]);
  return (
    <RegistrationContainer>
      <form id="mktoForm_1065" />
    </RegistrationContainer>
  );
};

export default EuropeRegistration;
