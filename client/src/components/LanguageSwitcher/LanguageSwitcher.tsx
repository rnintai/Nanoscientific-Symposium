import { Menu, MenuItem, MenuList } from "@mui/material";
import NSSButton from "components/Button/NSSButton";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router";
import useAdminStore from "store/AdminStore";

const LanguageSwitcher = () => {
  const { currentLanguage, setCurrentLanguage } = useAdminStore();
  const [langMenuAnchorEl, setLangMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const openLangMenu = Boolean(langMenuAnchorEl);
  const isEnglish = currentLanguage === "english";
  const isChinese = currentLanguage === "china";
  const navigate = useNavigate();
  const handleLangMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenuAnchorEl(event.currentTarget);
  };
  const handleLangMenuClose = () => {
    setLangMenuAnchorEl(null);
  };
  return (
    <>
      <NSSButton
        id="basic-button"
        className="user-menu"
        type="button"
        variant="icon"
        onClick={handleLangMenuClick}
        aria-controls={openLangMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openLangMenu ? "true" : undefined}
      >
        <LanguageIcon />
      </NSSButton>
      <Menu
        id="basic-menu"
        open={openLangMenu}
        onClose={handleLangMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorEl={langMenuAnchorEl}
        disableScrollLock
      >
        <MenuList dense>
          <MenuItem
            key="menu-lang-cn"
            onClick={() => {
              setCurrentLanguage("china");
              navigate(0);
              handleLangMenuClose();
            }}
            sx={{
              pointerEvents: isChinese ? "none" : "default",
              fontWeight: isChinese ? 600 : 300,
            }}
          >
            简体中文
          </MenuItem>
          <MenuItem
            key="menu-lang-en"
            onClick={() => {
              setCurrentLanguage("english");
              navigate(0);
              handleLangMenuClose();
            }}
            sx={{
              pointerEvents: isEnglish ? "none" : "default",
              fontWeight: isEnglish ? 600 : 300,
            }}
          >
            English
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
