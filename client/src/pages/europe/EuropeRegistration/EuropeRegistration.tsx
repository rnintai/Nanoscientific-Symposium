import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalButton } from "react-paypal-button-v2";

import { useNavigate } from "react-router";
import {
  RegistrationContainer,
  PayPalContainer,
} from "./EuropeRegistrationStyles";

const EuropeRegistration = () => {
  const [checkout, setCheckout] = useState<boolean>(false);
  const [registerFee, setRegisterFee] = useState<string>("20");
  const navigate = useNavigate();

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
        form.getFormElem()[0][19].remove();
      },
    );
  }, []);

  useEffect(() => {
    document
      .querySelector(".mktoButton2")
      ?.addEventListener("click", (e: Event) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (window.MktoForms2.allForms()[0].validate() === true) {
          setCheckout(true);
        }
      });
  }, [document.querySelector(".mktoButton")]);
  return (
    <RegistrationContainer>
      <form id="mktoForm_1065" />
      {!checkout && (
        <Button variant="contained" className="mktoButton2">
          CHECKOUT
        </Button>
      )}
      {/* {checkout && (
        <PayPalButton
        amount="20.00"
        options={{
          clientId:
          "Ab7DDztb5dlZOIvcQER01Iw0RsBanvxQBRNiiL6ORL56nYEZhF0CuSyTNNOj5ZwyTszzAD1ht4P4lGbA",
        }}
        />
      )} */}
      {checkout && (
        <div className="paypal-container">
          <Button
            onClick={(e: any) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.MktoForms2.allForms()[0]
                .submit()
                .onSubmit(() => {
                  // loading
                  e.preventDefault();
                  alert("onSubmit");
                })
                .onSuccess(() => {
                  e.preventDefault();
                  alert("onSuccess");
                  navigate("/success");
                  // user db submit
                  // go to success page
                });
            }}
          >
            submit
          </Button>
          <PayPalScriptProvider
            options={{
              "client-id":
                "Ab7DDztb5dlZOIvcQER01Iw0RsBanvxQBRNiiL6ORL56nYEZhF0CuSyTNNOj5ZwyTszzAD1ht4P4lGbA",
              currency: "EUR",
            }}
          >
            <PayPalButtons
              style={{ color: "blue" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: registerFee,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const result = actions?.order?.capture().then((details) => {
                  const transactionId = details.id;
                  // snackBar?
                  alert(`Transaction completed. ${transactionId}`);
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const formData = window.MktoForms2.allForms()[0].getValues();
                  console.log(formData);
                  // marketo submit
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  window.MktoForms2.allForms()[0]
                    .submit()
                    .onSubmit(() => {
                      // loading
                      console.log("onSubmit");
                    })
                    .onSuccess(() => {
                      console.log("onSuccess");
                      // user db submit
                      // go to success page
                    });
                });
                return result;
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </RegistrationContainer>
  );
};

export default EuropeRegistration;
