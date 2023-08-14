"use client"
import dynamic from 'next/dynamic'
const NewTodoListInput = dynamic(() => import('@/component/NewTodoInput'), { ssr: false })
const TodoList = dynamic(() => import('@/component/TodoList'), { ssr: false })
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