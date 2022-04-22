/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button, Switch } from "@mui/material";
import { useAuthState } from "context/AuthContext";
import { adminRole } from "utils/Roles";

const drawerWidth = 240;

interface AdminAppBarProps {
  title: string;
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
  menus?: Admin.menuType[];
}

const AdminAppBar = ({
  title,
  hideToggle,
  setHideToggle,
  hideToggleHandler,
  isHideLoading,
  isPublished,
  menus,
}: AdminAppBarProps) => {
  // useEffect(() => {
  //   if (hideToggleHandler) {
  //     hideToggleHandler();
  //   }
  // }, [hideToggle]);
  const authState = useAuthState();

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
        {setHideToggle &&
          hideToggleHandler &&
          adminRole.includes(authState.role) && (
            <>
              <div>Publish?</div>
              <Switch
                disabled={isHideLoading}
                checked={hideToggle}
                color="default"
                onClick={() => {
                  setHideToggle(!hideToggle);
                }}
              />
              <LoadingButton
                disabled={isPublished === hideToggle}
                loading={isHideLoading}
                onClick={hideToggleHandler}
                color="success"
                variant="contained"
                style={{ marginRight: "20px" }}
              >
                Apply
              </LoadingButton>
            </>
          )}
        {menus &&
          menus.map((menu) => (
            <Button
              onClick={menu.clickHandler}
              color="inherit"
              disabled={menu.disabled ? menu.disabled : false}
            >
              {menu.name}
            </Button>
          ))}
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
