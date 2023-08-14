"use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FilterLink from './FilterLink';
import Link from '@mui/material/Link';
import { useRecoilState } from "recoil";
import type { AppState, Todo } from "../../app/dataStructure";
import { recoilState } from "../../app/dataStructure";

export default function UnderBar({ total }: any) {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState);
  const completed: number = appState.todoList.filter((t) => t.completed === true).length;
  const backlog: number = appState.todoList.filter((t) => t.completed === false).length;

  function clearCompleted(): void {
    setAppState({
      todoList: appState.todoList.filter((t: Todo) => !t.completed),
    });
  }
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      component="form"
      sx={{ padding: "8px 10px 0 10px", color: "gray", position: "relative" }}>
      <Typography variant="body2" display="block">
        {`${backlog}/${total} ${backlog > 1 ? "items" : "item"} left`}
      </Typography>
      <FilterLink />
      <Typography
        variant="body2"
        display="block"
        sx={completed > 0 ?
          { opacity: 1, cursor: "pointer" }
          :
          { opacity: 0, cursor: "default" }}>
        <Link sx={{ color: "gray" }} onClick={() => clearCompleted()}>Clear completed</Link>
      </Typography>
    </Stack>
  )
}
