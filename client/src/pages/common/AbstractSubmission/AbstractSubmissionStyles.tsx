import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

export const AbstractSubmissionContainer = styled.div`
  .mktoForm {
    margin: 80px auto 0 auto;
    font-family: "Open Sans", "Noto Sans JP" !important;
    max-width: 591px !important;
    width: initial !important;

    .mktoField {
      background-color: white;
      border: 1px solid #ddd;
    }

    a {
      padding: 0 !important;
    }

    // reset
    input[type="text"],
    input[type="url"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    input[type="date"],
    select.mktoField,
    textarea.mktoField,
    input[type="checkbox"] + label:before,
    input[type="radio"] + label:before {
      box-shadow: none;
    }

    .mktoLogicalField.mktoCheckboxList.mktoHasWidth {
      width: initial !important;
    }
  }
  .flex-reverse {
    display: flex;
    flex-direction: row-reverse;
  }
`;
