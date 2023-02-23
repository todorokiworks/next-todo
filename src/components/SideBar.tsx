import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import { styled } from "@mui/material/styles";
import { indigo, pink, lightBlue } from "@mui/material/colors";

import pjson from "../../package.json";

const DrawerList = styled("div")(() => ({
  width: 250,
}));

const DrawerHeader = styled("div")(() => ({
  height: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1em",
  backgroundColor: indigo[500],
  color: "#ffffff",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
  marginBottom: 10,
}));

type Props = {
  drawerOpen: boolean;
  onToggleQR: () => void;
  onToggleDrawer: () => void;
  onSort: (type: Type) => void;
};

export const SideBar = (props: Props) => {
  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.onToggleDrawer}
      anchor="left"
    >
      <DrawerList role="presentation" onClick={props.onToggleDrawer}>
        <DrawerHeader>
          <DrawerAvatar>
            <Icon>create</Icon>
          </DrawerAvatar>
          TODO v{pjson.version}
        </DrawerHeader>
        <List>
          <ListItem disablePadding>
            <ListItemButton autoFocus onClick={() => props.onSort("all")}>
              <ListItemIcon>
                <Icon>subject</Icon>
              </ListItemIcon>
              <ListItemText secondary="すべてのタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => props.onSort("unchecked")}>
              <ListItemIcon>
                <Icon sx={{ color: lightBlue[500] }}>
                  radio_button_unchecked
                </Icon>
              </ListItemIcon>
              <ListItemText secondary="現在のタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => props.onSort("checked")}>
              <ListItemIcon>
                <Icon sx={{ color: pink.A200 }}>check_circle_outline</Icon>
              </ListItemIcon>
              <ListItemText secondary="完了したタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => props.onSort("removed")}>
              <ListItemIcon>
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText secondary="ゴミ箱" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={props.onToggleQR}>
                <ListItemIcon>
                    <Icon>share</Icon>
                </ListItemIcon>
                <ListItemText secondary="このアプリを共有"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </DrawerList>
    </Drawer>
  );
};
