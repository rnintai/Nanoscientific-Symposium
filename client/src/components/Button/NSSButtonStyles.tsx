import styled from "styled-components";
import { useTheme } from "@mui/material";

export const NSSButtonContainer = styled.button`
  transition: background-color 0.2s ease-in-out;
  padding: 15px 10px;
  font-weight: ${() => {
    const theme = useTheme();
    return theme.typography.fontWeightBold;
  }};
  margin: 0 auto;
  &.primary {
    color: ${() => {
      const theme = useTheme();
      return theme.palette.text.primary;
    }};
    &:hover {
      background-color: rgba(33, 173, 229, 0.04);
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  &.gradient {
    background: ${() => {
      const theme = useTheme();
      return theme.palette.primary.gradation;
    }};
    color: ${() => {
      const theme = useTheme();
      return theme.palette.common.white;
    }};

    border: 2px solid #fff;
    border-radius: 25px;
    padding: 3px 15px;
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: scale(1.02);
    }
    &:active {
      transform: scale(1.02);
    }
  }
  display: flex;
  align-items: center;
`;
