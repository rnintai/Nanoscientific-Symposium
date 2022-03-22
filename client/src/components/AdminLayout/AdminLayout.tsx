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
  // eslint-disable-next-line react/require-default-props
  menu2?: string;
  // eslint-disable-next-line react/require-default-props
  menu2ClickHandler?: () => void;
  // eslint-disable-next-line react/require-default-props
  menu3?: string;
  // eslint-disable-next-line react/require-default-props
  menu3ClickHandler?: () => void;
  // eslint-disable-next-line react/require-default-props
  menu4?: string;
  // eslint-disable-next-line react/require-default-props
  menu4ClickHandler?: () => void;
  // eslint-disable-next-line react/require-default-props
  hideToggle?: boolean;
  // eslint-disable-next-line react/require-default-props
  setHideToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line react/require-default-props
  hideToggleHandler?: () => void;
  // eslint-disable-next-line react/require-default-props
  isHideLoading?: boolean;
  // eslint-disable-next-line react/require-default-props
  isPublished?: boolean;
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
