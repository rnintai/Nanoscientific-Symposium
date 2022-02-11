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
  // eslint-disable-next-line react/require-default-props
  menu1?: string;
  // eslint-disable-next-line react/require-default-props
  menu1ClickHandler?: () => void;
}

const AdminLayout = ({
  title,
  children,
  menu1,
  menu1ClickHandler,
}: AdminLayoutProps) => {
  return (
    <AdminLayoutContainer>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminAppBar
          title={title}
          menu1={menu1}
          menu1ClickHandler={menu1ClickHandler}
        />
        <AdminNavBar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#e7e8e9", p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
