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
  hideToggle?: boolean;
  setHideToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  hideToggleHandler?: () => void;
  isHideLoading?: boolean;
  isPublished?: boolean;
  menus?: Admin.menuType[];
}

const AdminLayout = ({
  title,
  children,
  hideToggle,
  setHideToggle,
  hideToggleHandler,
  isHideLoading,
  isPublished,
  menus,
}: AdminLayoutProps) => {
  return (
    <AdminLayoutContainer>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminAppBar
          title={title}
          hideToggle={hideToggle}
          setHideToggle={setHideToggle}
          hideToggleHandler={hideToggleHandler}
          isHideLoading={isHideLoading}
          isPublished={isPublished}
          menus={menus}
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
