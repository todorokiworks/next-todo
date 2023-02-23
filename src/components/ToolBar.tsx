import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

type Props = {
  type: Type;
  onToggleDrawer:() => void;
};

export const ToolBar = (props: Props) => {
  const translator = (arg: Type) => {
    switch (arg) {
      case "all":
        return "すべてのタスク";
      case "checked":
        return "完了したタスク";
      case "unchecked":
        return "現在のタスク";
      case "removed":
        return "ゴミ箱";
      default:
        return "TODO";
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            onClick={props.onToggleDrawer}
          >
            <Icon sx={{ mr: 2 }}>menu</Icon>
            <Typography>{translator(props.type)}</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
