import styled from "styled-components";

export const RegistrationContainer = styled.div`
  width: 1200px;
  min-height: calc(100vh - 120px);
  padding: 30px 0;
  margin: 60px auto 0 auto;
  .mktoForm {
    margin: 0 auto;
    font-family: "Open Sans" !important;

    .mktoField {
      background-color: white;
      border: 1px solid #ddd;
    }
  }
  .paypal-container {
    width: 200px;
    margin: 0 auto;
  }

  .validation-msg {
    position: relative;
    top: 32px;
    left: 100%;
    transform: translateX(-38%);
    font-size: 12px;

    &.valid {
      color: green;
    }
    &.invalid {
      color: #d20000;
    }
  }

  .mktoButton2 {
    left: 50%;
    transform: translateX(-50%);
  }

  &.loading form {
    display: none;
  }
`;

export const PayPalContainer = styled.div``;
