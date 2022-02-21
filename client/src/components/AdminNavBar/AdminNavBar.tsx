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
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        <Link to={`/${pathname}/admin/programs`}>
          <ListItem button>
            <ListItemIcon>
              <EventNoteTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Programs" />
          </ListItem>
        </Link>
        <Link to={`/${pathname}/admin/speakers`}>
          <ListItem button>
            <ListItemIcon>
              <CampaignTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Speakers" />
          </ListItem>
        </Link>
        <Link to={`/${pathname}/admin/users`}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to={`/${pathname}`}>
          <ListItem button>
            <ListItemIcon>
              <LogoutTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="GO Site" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default AdminNavBar;
