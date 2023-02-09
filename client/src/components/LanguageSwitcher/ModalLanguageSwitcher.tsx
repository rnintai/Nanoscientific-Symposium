import { Button, ButtonGroup } from "@mui/material";
import React from "react";

interface ModalLanguageSwitcherProps {
  language: Common.languageType;
  setLanguage: React.Dispatch<React.SetStateAction<Common.languageType>>;
}

const ModalLanguageSwitcher = (props: ModalLanguageSwitcherProps) => {
  const { language, setLanguage } = props;
  const textStyle = { textTransform: "none" };
  const isChinese = language === "china";
  return (
    <ButtonGroup>
      <Button
        sx={textStyle}
        variant={isChinese ? "contained" : "outlined"}
        onClick={() => {
          setLanguage("china");
        }}
      >
        Chinese
      </Button>
      <Button
        sx={textStyle}
        variant={!isChinese ? "contained" : "outlined"}
        onClick={() => {
          setLanguage("english");
        }}
      >
        English
      </Button>
    </ButtonGroup>
  );
};

export default ModalLanguageSwitcher;
