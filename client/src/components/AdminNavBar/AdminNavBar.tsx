import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import usePageViews from "hooks/usePageViews";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

const drawerWidth = 240;

const AdminNavBar = () => {
  const pathname = usePageViews();
  const menus = [
    {
      title: "Programs",
      link: `/${pathname}/admin/program`,
      icon: <EventNoteTwoToneIcon />,
    },
    {
      title: "Speakers",
      link: `/${pathname}/admin/speakers`,
      icon: <CampaignTwoToneIcon />,
    },
    {
      title: "Users",
      link: `/${pathname}/admin/users`,
      icon: <PeopleAltTwoToneIcon />,
    },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          a: {
            p: 0,
            display: "block",
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {menus &&
          menus.map((menu) => (
            <Link to={menu.link}>
              <ListItem button>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.title} />
              </ListItem>
            </Link>
          ))}
      </List>
      <Divider />
      <List>
        <Link to={`/${pathname}`}>
          <ListItem button>
            <ListItemIcon>
              <LogoutTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Site" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default AdminNavBar;
