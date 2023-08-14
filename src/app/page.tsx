"use client"
import NewTodoListInput from '@/component/NewTodoInput'
import TodoList from '@/component/TodoList'
import { useRecoilValue } from "recoil";
import type { AppState } from "./dataStructure";
import { recoilState, LocalStorageKey } from "./dataStructure";
import { useEffect } from 'react';

export default function Home() {
  const appState = useRecoilValue<AppState>(recoilState);

  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState)
    );
  }, [appState]);

  return (
    <>
      <NewTodoListInput />
      <TodoList />
    </>
  )
}