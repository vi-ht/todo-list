"use client"
import * as React from 'react';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import UnderBar from '../UnderBar';
import TodoListItem from './Item';
import { useRecoilState } from "recoil";
import type { AppState, Todo } from "../../app/dataStructure";
import { recoilState } from "../../app/dataStructure";
import { usePathname } from 'next/navigation'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function TodoList() {
  const pathname = usePathname();
  const [option, setOption] = useState(1);
  const [appState, setAppState] = useRecoilState<AppState>(recoilState);
  const completed: number = appState.todoList.filter((t) => t.completed === true).length;
  const backlog: number = appState.todoList.filter((t) => t.completed === false).length;

  useEffect(() => {
    const changeLink = () => {
      switch (pathname) {
        case "/":
          setOption(1)
          break;
        case "/active":
          setOption(2)
          break;
        case "/completed":
          setOption(3)
          break;
        default:
          return true;
      }
    }
    changeLink();
  }, [pathname])

  const filterTodoList = (list: Todo[]) => {
    return (list.map((value: Todo) => (
      <div key={value.id}>
        <TodoListItem
          key={value.id}
          value={value.bodyText}
          id={value.id}
          isCompleted={value.completed} />
        <Divider />
      </div>
    )
    ))
  }

  const EmptyListItem = (message: string) => {
    return (
      <>
        <ListItem key={message}>
          <ListItemText primary={message} sx={{ textAlign: "center", color: "gray" }} />
        </ListItem>
        <Divider />
      </>
    );
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {appState.todoList.length === 0 ?
        EmptyListItem("You're free :)), add more tasks to be a busy people!")
        : option === 1 ?
          filterTodoList(appState.todoList)
          : option === 2 ?
            backlog !== 0 ?
              filterTodoList(appState.todoList.filter(value => {
                return value.completed === false
              }))
              :
              EmptyListItem("There are no active tasks!")
            : completed != 0 ?
              filterTodoList(appState.todoList.filter(value => {
                return value.completed === true
              }))
              :
              EmptyListItem("There are no completed tasks!")
      }
      <UnderBar total={appState.todoList.length} />
    </List >
  );

}




