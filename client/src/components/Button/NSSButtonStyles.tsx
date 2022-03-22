import styled from "styled-components";
import { useTheme } from "@mui/material";

export const NSSButtonContainer = styled.button`
  transition: background-color 0.2s ease-in-out;
  padding: 15px 10px;
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
    border: 2px solid #fff;
    border-radius: 25px;
    padding: 2px 12px;
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
