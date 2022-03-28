/* eslint-disable react/require-default-props */
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AdminNavBar from "components/AdminNavBar/AdminNavBar";
import AdminAppBar from "components/AdminAppBar/AdminAppBar";
import { AdminLayoutContainer } from "./AdminLayoutStyles";
import "css/admin.css";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  menu1?: string;
  menu1ClickHandler?: () => void;
  menu2?: string;
  menu2ClickHandler?: () => void;
  menu3?: string;
  menu3ClickHandler?: () => void;
  menu4?: string;
  menu4ClickHandler?: () => void;
  hideToggle?: boolean;
  setHideToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  hideToggleHandler?: () => void;
  isHideLoading?: boolean;
  isPublished?: boolean;
  menu1Disabled?: boolean;
  menu2Disabled?: boolean;
  menu3Disabled?: boolean;
}

const AdminLayout = ({
  title,
  children,
  menu1,
  menu1ClickHandler,
  menu2,
  menu2ClickHandler,
  menu3,
  menu3ClickHandler,
  menu4,
  menu4ClickHandler,
  hideToggle,
  setHideToggle,
  hideToggleHandler,
  menu1Disabled,
  menu2Disabled,
  menu3Disabled,
  isHideLoading,
  isPublished,
}: AdminLayoutProps) => {
  return (
    <AdminLayoutContainer>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminAppBar
          title={title}
          menu1={menu1}
          menu1ClickHandler={menu1ClickHandler}
          menu2={menu2}
          menu2ClickHandler={menu2ClickHandler}
          menu3={menu3}
          menu3ClickHandler={menu3ClickHandler}
          menu4={menu4}
          menu4ClickHandler={menu4ClickHandler}
          hideToggle={hideToggle}
          setHideToggle={setHideToggle}
          hideToggleHandler={hideToggleHandler}
          isHideLoading={isHideLoading}
          isPublished={isPublished}
          menu1Disabled={menu1Disabled}
          menu2Disabled={menu2Disabled}
          menu3Disabled={menu3Disabled}
        />
        <AdminNavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
