import styled from "styled-components";

export const OnDemandFilterContainer = styled.div`
  &:before {
    content: none;
  }

  .MuiAccordionSummary-root {
    padding: 0;

    &.Mui-expanded {
      min-height: 48px;
    }

    .MuiAccordionSummary-content {
      margin: 0;
    }
  }
`;
