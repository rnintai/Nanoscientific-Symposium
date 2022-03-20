import styled from "styled-components";
import { useTheme } from "@mui/material";

export const RegistrationContainer = styled.div`
  max-width: 1200px;
  min-height: calc(100vh - 120px);
  padding: 30px 0;
  margin: 60px auto 0 auto;

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

  .mktoLogicalField.mktoCheckboxList.mktoHasWidth {
    width: initial !important;
  }
  #LblpsmktOptin,
  #LblpsOptin {
    max-width: 590px !important;
    width: initial !important;
  }

  .mktoButton2 {
    left: 50%;
    transform: translateX(-50%);
  }

  &.loading form {
    display: none;
  }

  @media screen and (max-width: 1090px) {
    margin: 52px auto 0 auto;
  }
`;

export const PayPalContainer = styled.div``;

export const MktoFormContainer = styled.div``;
