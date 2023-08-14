
"use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { createRef } from "react";
import { useRecoilState } from "recoil";
import type { AppState, Todo } from "../../app/dataStructure";
import { recoilState } from "../../app/dataStructure";
import { v4 as uuidv4 } from 'uuid';

const ariaLabel = { 'aria-label': 'description' };

export default function NewTodoListInput() {
    const [appState, setAppState] = useRecoilState<AppState>(recoilState);

    const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

    function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {

        if (e.key === "Enter") {
            if (textInput.current !== null) {
                const todo: Todo = {
                    bodyText: textInput.current.value,
                    completed: false,
                    id: uuidv4(),
                };
                setAppState({ todoList: [todo, ...appState.todoList] });
                textInput.current.value = "";
                e.preventDefault()
            }
        }

    }

    function toggleAllCheckbox(e: React.MouseEvent<HTMLButtonElement>): void {
        setAppState({ todoList: appState.todoList.map((t: Todo): Todo => ({ ...t, completed: !t.completed })) });
    }
    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
                boxSizing: 'border-box',
                backgroundColor: "white", padding: "0px 10px", fontSize: "16px",
                width: "100%",
                borderBottom: "0.5px solid lightgray",
            }}
            noValidate
            autoComplete="off"
        >
            <IconButton edge="end" aria-label="comments" size="small" onClick={(e) => toggleAllCheckbox(e)}>
                <ExpandMoreIcon sx={{ color: "gray", fontSize: "30px" }} />
            </IconButton>

            <InputBase
                id="input-with-icon-textfield"
                placeholder='What needs to be done?'
                inputRef={textInput}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
                style={{ fontSize: "20px", position: "relative", left: "-5px", border: "none" }}
            />
        </Stack>
    )
}


