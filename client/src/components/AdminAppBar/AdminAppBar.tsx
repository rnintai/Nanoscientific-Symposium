import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Button, Switch } from "@mui/material";

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

const AdminAppBar = ({
  title,
  menu1,
  menu1ClickHandler,
  menu2,
  menu2ClickHandler,
  menu3,
  menu3ClickHandler,
  hideToggle,
  setHideToggle,
  hideToggleHandler,
  isHideLoading,
  isPublished,
}: AdminAppBarProps) => {
  // useEffect(() => {
  //   if (hideToggleHandler) {
  //     hideToggleHandler();
  //   }
  // }, [hideToggle]);

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
        {setHideToggle && hideToggleHandler && (
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
        <Button onClick={menu1ClickHandler} color="inherit">
          {menu1}
        </Button>
        <Button onClick={menu2ClickHandler} color="inherit">
          {menu2}
        </Button>
        <Button onClick={menu3ClickHandler} color="inherit">
          {menu3}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
