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
  menu1?: string;
  // eslint-disable-next-line react/require-default-props
  menu1ClickHandler?: () => void;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  menu2?: string;
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  menu2ClickHandler?: () => void;
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  menu3?: string;
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  menu3ClickHandler?: () => void; // eslint-disable-next-line react/require-default-props
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  menu4?: string;
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  menu4ClickHandler?: () => void; // eslint-disable-next-line react/require-default-props
  hideToggle?: boolean;
  // eslint-disable-next-line react/require-default-props
  setHideToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line react/require-default-props
  hideToggleHandler?: () => void;
  // eslint-disable-next-line react/require-default-props
  isHideLoading?: boolean;
  // eslint-disable-next-line react/require-default-props
  isPublished?: boolean;
  menu1Disabled?: boolean;
  menu2Disabled?: boolean;
  menu3Disabled?: boolean;
}

const AdminAppBar = ({
  title,
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
  menu1Disabled,
  menu2Disabled,
  menu3Disabled,
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
        {menu1 && (
          <Button
            onClick={menu1ClickHandler}
            color="inherit"
            disabled={menu1Disabled}
          >
            {menu1}
          </Button>
        )}
        {menu2 && (
          <Button
            onClick={menu2ClickHandler}
            color="inherit"
            disabled={menu2Disabled}
          >
            {menu2}
          </Button>
        )}
        {menu3 && (
          <Button
            onClick={menu3ClickHandler}
            color="inherit"
            disabled={menu3Disabled}
          >
            {menu3}
          </Button>
        )}
        {menu4 && (
          <Button onClick={menu4ClickHandler} color="inherit">
            {menu4}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
