import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button } from "@mui/material";

const drawerWidth = 240;

interface AdminAppBarProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  menu1?: string;
  // eslint-disable-next-line react/require-default-props
  menu1ClickHandler?: () => void;
}

const AdminAppBar = ({ title, menu1, menu1ClickHandler }: AdminAppBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button onClick={menu1ClickHandler} color="inherit">
          {menu1}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
