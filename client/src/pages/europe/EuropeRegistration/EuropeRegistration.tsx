import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useNavigate } from "react-router";
import axios from "axios";
import { RegistrationContainer } from "./EuropeRegistrationStyles";

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
        <>
          <Button variant="contained" className="mktoButton2">
            CHECKOUT
          </Button>
          <Button
            variant="contained"
            className="mktoButton2"
            onClick={async () => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //    @ts-ignore
              // // user db submit
              const formData =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.MktoForms2.allForms()[0].getValues();
              try {
                const regResponse = await axios.post("/api/page/eu/register", {
                  email: formData.Email,
                  title: formData.Title,
                  university: formData.Company,
                  institute: formData.Department,
                  street: formData.City,
                  zipCode: formData.PostalCode,
                  city: formData.State,
                  researchField: formData.psResearchTopic,
                  afmTool: formData.psExistingAFMBrand,
                  nanoMechanical: formData.psnsforumregistrationq01,
                  characterizationOfSoft: formData.psnsforumregistrationq02,
                  advancedImaging: formData.psnsforumregistrationq03,
                  highResolutionImaging: formData.psnsforumregistrationq04,
                  automationInAfm: formData.psnsforumregistrationq05,
                  lastName: formData.LastName,
                  firstName: formData.FirstName,
                  psOptIn: formData.psOptIn === "yes" ? 1 : 0,
                });

                await axios.post("/api/page/eu/transaction", {
                  id: "asdfqwertyass",
                  userId: regResponse.data.id,
                });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.MktoForms2.allForms()[0]
                  .submit()
                  .onSuccess(() => {
                    console.log("mkto success");
                    return false;
                  });

                navigate("/eu/setpassword");
              } catch (err) {
                console.log(err);
                alert("error: saving user data. Please try again.");
              }
            }}
          >
            Test
          </Button>
        </>
      )}
      {checkout && (
        <div className="paypal-container">
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
              onError={() => {
                alert("Paypal Module Error. Please try again later.");
              }}
              onApprove={async (data, actions) => {
                const result = actions?.order?.capture().then((details) => {
                  const transactionId = details.id;
                  // snackBar?

                  // save transaction to db

                  // marketo submit
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  window.MktoForms2.allForms()[0]
                    .submit()
                    // .onSubmit(() => {
                    //   // loading
                    //   console.log("onSubmit");
                    // })
                    .onSuccess(async () => {
                      // user db submit
                      const formData =
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        window.MktoForms2.allForms()[0].getValues();
                      try {
                        const regResponse = await axios.post(
                          "/api/page/eu/register",
                          {
                            email: formData.Email,
                            title: formData.Title,
                            university: formData.Company,
                            institute: formData.Department,
                            street: formData.City,
                            zipCode: formData.PostalCode,
                            city: formData.State,
                            researchField: formData.psResearchTopic,
                            afmTool: formData.psExistingAFMBrand,
                            nanoMechanical: formData.psnsforumregistrationq01,
                            characterizationOfSoft:
                              formData.psnsforumregistrationq02,
                            advancedImaging: formData.psnsforumregistrationq03,
                            highResolutionImaging:
                              formData.psnsforumregistrationq04,
                            automationInAfm: formData.psnsforumregistrationq05,
                            lastName: formData.LastName,
                            firstName: formData.FirstName,
                            psOptIn: formData.psOptIn === "yes" ? 1 : 0,
                          },
                        );

                        await axios.post("/api/page/eu/transaction", {
                          id: "asdfqwertyass",
                          userId: regResponse.data.id,
                        });
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        window.MktoForms2.allForms()[0]
                          .submit()
                          .onSuccess(() => {
                            console.log("mkto success");
                            return false;
                          });

                        navigate("/eu/setpassword");
                      } catch (err) {
                        console.log(err);
                        alert("error: saving user data. Please try again.");
                      }
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
