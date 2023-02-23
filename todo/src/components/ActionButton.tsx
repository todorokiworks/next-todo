import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";

import { styled } from "@mui/material/styles";

type Props = {
  todos: Todo[];
  type: Type;
  alertOpen: boolean;
  dialogOpen: boolean;
  onToggleAlert: () => void;
  onToggleDialog: () => void;
};

const FabButton = styled(Fab)({
  position: "fixed",
  right: 15,
  bottom: 15,
  fontSize:10
});

export function ActionButton(props: Props) {
  const removed = props.todos.filter((todo) => todo.removed).length !== 0;
  return (
    <>
      {props.type === "removed" ? (
        <FabButton
          color="secondary"
          onClick={props.onToggleAlert}
          disabled={!removed || props.alertOpen}
        >
          <Icon>delete</Icon>
        </FabButton>
      ) : (
        <FabButton
          color="secondary"
          onClick={props.onToggleDialog}
          disabled={props.type === "checked" || props.dialogOpen}
        >
          <Icon>create</Icon>
        </FabButton>
      )}
    </>
  );
}
