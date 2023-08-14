"use client"
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import BpCheckbox from '../CustomCheckBox/index';
import { useState, createRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import type { AppState, Todo, TodoListType } from "../../../app/dataStructure";
import { recoilState } from "../../../app/dataStructure";

interface Props {
  todo: Todo;
}

interface State {
  onEdit: boolean;
}

export default function TodoListItem({ value, id, isCompleted }: any) {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState);
  const editInput = createRef<HTMLInputElement>();
  const init: State = { onEdit: false };
  const [state, setState] = useState(init);
  const [hidden, setHidden] = useState(true);

  const onClick = (): void => {
    setState({ onEdit: true });
  };

  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false });
    } else {
      removeItem(id);
    }
  };

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === "Escape") {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false });
      }
    }
  };

  // Control Todo's CSS based on complex user interaction
  // const SwitchStyle = (t: Todo, onEdit: boolean): string => {
  //   switch (true) {
  //     case onEdit && t.completed:
  //       return "completed editing";
  //     case onEdit && !t.completed:
  //       return "editing";
  //     case !onEdit && t.completed:
  //       return "completed";
  //     case !onEdit && !t.completed:
  //       return "";

  //     default:
  //       return "";
  //   }
  // };

  const removeItem = (terminal: Todo["id"]): void => {
    const removed: TodoListType = appState.todoList.filter((t: Todo): boolean => t.id !== terminal);
    setAppState({ todoList: removed });
  };

  const reverseCompleted = (id: Todo["id"]): void => {
    const toggled: TodoListType = appState.todoList.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      } else {
        return t;
      }
    });

    setAppState({ todoList: toggled });
  };

  const handleTodoTextEdit = (e: React.ChangeEvent<HTMLInputElement>, onEdit: Todo["id"]) => {
    editInput.current?.focus();
    const edited = appState.todoList.map((t: Todo): Todo => {
      if (t.id === onEdit) {
        return { ...t, bodyText: e.target.value };
      } else {
        return t;
      }
    });
    setAppState({ todoList: edited });
  };

  useEffect(() => {
    if (state.onEdit === true && editInput.current !== null) {
      editInput.current.focus();
    }
  }, [editInput, state.onEdit]);

  const handleHidden = () => {
    setHidden(true);
  }

  const handleVisible = () => {
    setHidden(false);
  }
  return (
    <ListItem
      key={id}
      sx={{ margin: "5px 17px" }}
      onMouseOver={handleVisible}
      onMouseOut={handleHidden}
      secondaryAction={
        <IconButton
          onClick={() => removeItem(id)}
          edge="end"
          aria-label="comments"
          sx={hidden ? {
            opacity: 0,
            marginRight: "20px",
          } : {
            opacity: 1,
            marginRight: "20px",
            '&:hover': {
              color: "red"
            }
          }}>
          <CloseIcon />
        </IconButton>
      }
      disablePadding
    >

      <ListItemIcon>
        <BpCheckbox
          isCompleted={isCompleted}
          handleChange={reverseCompleted}
          id={id}
        />
      </ListItemIcon>
      <InputBase
        inputRef={editInput}
        onClick={onClick}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
        id="input-with-icon-textfield"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleTodoTextEdit(e, id)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          submitEditText(e)
        }
        sx={{ fontSize: "20px" }}
      />
    </ListItem>
  )
}
