import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { RegistrationContainer } from "./EuropeRegistrationStyles";

const EuropeRegistration = () => {
  useEffect(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.MktoForms2.loadForm(
      "//pages.parksystems.com",
      "988-FTP-549",
      1065,
      (form: any) => {
        console.log(form);
        console.log(form.getFormElem());
        console.log(form.vals());
        form.getFormElem()[0].addEventListener("submit", (e: SubmitEvent) => {
          e.preventDefault();
        });
        // form.onSubmit((e: any) => {
        //   console.log(e);
        //   e.preventDefault();
        // });
        //
      },
    );
  }, []);

  useEffect(() => {
    // document
    //   .getElementById("mktoForm_1065")
    //   ?.addEventListener("submit", (e: SubmitEvent) => {
    //     console.log(e);
    //     e.preventDefault();
    //     console.log("submitted");
    //   });
    document
      .querySelector(".mktoButton2")
      ?.addEventListener("click", (e: Event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(window.MktoForms2);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(window.MktoForms2.allForms()[0]);
      });
  }, [document.querySelector(".mktoButton")]);
  return (
    <RegistrationContainer>
      <form id="mktoForm_1065" />
      <Button className="mktoButton2">check</Button>
    </RegistrationContainer>
  );
};

export default EuropeRegistration;
