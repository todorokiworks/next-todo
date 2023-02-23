import React, { useCallback, useEffect, useState } from "react";
import { FormDialog } from "./components/FormDialog";
import { SideBar } from "./components/SideBar";
import { TodoItem } from "./components/TodoItem";
import { ToolBar } from "./components/ToolBar";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, pink } from "@mui/material/colors";
import { QR } from "./components/QR";
import { AlertDialog } from "./components/AlertDialog";
import { ActionButton } from "./components/ActionButton";
import localforage, { setItem } from "localforage";
import { isTodos } from "./lib/isTodo";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: "#757de8",
      dark: "#002984",
    },
    secondary: {
      main: pink[500],
      light: "#ff6090",
      dark: "#b0003a",
    },
  },
});

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [type, setType] = useState<Type>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) {
      setDialogOpen(false);
      return;
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([...todos, newTodo]);

    setText("");
    setDialogOpen(false);
  };

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
    setAlertOpen(!alertOpen);
  };

  const handleOnTodo = <T extends Todo, U extends keyof Todo, V extends T[U]>(
      obj: T,
      key: U,
      value: V
    ) => {
      const deepCopy = todos.map((todo) => ({ ...todo }));
      const newTodos = deepCopy.map((todo) => {
        if (todo.id === obj.id) {
          todo[key] = value;
        }
        return todo;
      });

      setTodos(newTodos);
    };

  const handleOnSort = (type: Type) => {
    setType(type);
  };

  const onToggleQr = useCallback(() => setQrOpen((qrOpen) => !qrOpen), []);
  const onToggleAlert = useCallback(() => setAlertOpen((alertOpen) => !alertOpen), []);
  const onToggleDrawer = useCallback(() => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  }, []);

  const onToggleDialog = useCallback(() => {
    setDialogOpen(!dialogOpen);
    setText("");
  },[]);

  useEffect(() => {
    localforage
      .getItem("todo-20230101")
      .then((values) => isTodos(values) && setTodos(values));
  }, []);

  useEffect(() => {
    localforage.setItem("todo-20230101", todos);
  }, [todos]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar type={type} onToggleDrawer={onToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onSort={handleOnSort}
        onToggleDrawer={onToggleDrawer}
        onToggleQR={onToggleQr}
      />
      <QR open={qrOpen} onClose={onToggleQr} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        onToggleDialog={onToggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onToggleAlert={onToggleAlert}
        onEmpty={handleOnEmpty}
      />
      <TodoItem todos={todos} type={type} onTodo={handleOnTodo} />
      <ActionButton
        todos={todos}
        type={type}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={onToggleAlert}
        onToggleDialog={onToggleDialog}
      />
    </ThemeProvider>
  );
};
