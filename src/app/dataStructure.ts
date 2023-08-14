import type { RecoilState } from "recoil";
import { atom } from "recoil";

export interface Todo {
  id: string;
  bodyText: string;
  completed: boolean;
}

export type TodoListType = Todo[];

export interface AppState {
  todoList: TodoListType;
}

export enum LocalStorageKey {
  APP_STATE = "APP_STATE",
}

function LoadAppStateFromLocalStorage(): AppState {
  const BlankAppState: AppState = {
    todoList: [],
  };
  if (typeof window !== "undefined") {
    const stringifiedJSON: string | null = window.localStorage.getItem(LocalStorageKey.APP_STATE);
    if (typeof stringifiedJSON === "string") {
      // neu stringifiedJSON === 'string'
      const Loaded: AppState = JSON.parse(stringifiedJSON); // chuyen doi stringifiedJSON ve object
      return Loaded;
    }
  }
  return BlankAppState;
}

export const recoilState: RecoilState<AppState> = atom({
  default: LoadAppStateFromLocalStorage(),
  key: "initialAppState",
});
