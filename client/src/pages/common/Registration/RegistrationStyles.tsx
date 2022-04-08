import styled from "styled-components";
import { useTheme } from "@mui/material";

export const RegistrationContainer = styled.div`
  .mktoForm {
    margin: 0 auto;
    font-family: "Open Sans" !important;
    max-width: 591px !important;
    width: initial !important;

    .mktoField {
      background-color: white;
      border: 1px solid #ddd;
    }
  }
  .banner {
    background-size: cover;
    height: 300px;
    .banner-img {
      height: 200px;
    }
  }
  .flex-reverse {
    display: flex;
    flex-direction: row-reverse;
  }
  .paypal-container {
    width: 200px;
    margin: 0 auto;
  }

  .validation-msg {
    font-size: 12px;
    font-weight: 500;

    &.valid {
      color: green;
    }
    &.invalid {
      color: #d20000;
    }
  }

  .mktoLabel {
    color: ${() => {
      const theme = useTheme();
      return theme.palette.text.primary;
    }} !important;

    a {
      padding: 0;
    }
  }

  // reset
  .mktoForm input[type="text"],
  .mktoForm input[type="url"],
  .mktoForm input[type="email"],
  .mktoForm input[type="tel"],
  .mktoForm input[type="number"],
  .mktoForm input[type="date"],
  .mktoForm select.mktoField,
  .mktoForm textarea.mktoField,
  .mktoForm input[type="checkbox"] + label:before,
  .mktoForm input[type="radio"] + label:before {
    box-shadow: none;
  }

  .mktoLogicalField.mktoCheckboxList.mktoHasWidth {
    width: initial !important;
  }
  #LblpsmktOptin,
  #LblpsOptin {
    max-width: 590px !important;
    width: initial !important;
  }

  .mktoButton2 {
    margin: 0 auto;
    transition: opacity 0.3s ease-in-out;
    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  &.loading form {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    .banner {
      height: 250px;
      .banner-img {
        height: 150px;
      }
    }
  }
`;

export const PayPalContainer = styled.div``;

export const MktoFormContainer = styled.div``;
