import {useState} from "react";
import dayjs from "dayjs";

const defaultTodoList = [
    {
        id: 1,
        content: "운동하기",
        date: dayjs(),
        isSuccess: true
    },
    {
        id: 2,
        content: "공부하기",
        date: dayjs(),
        isSuccess: false
    },
    {
        id: 3,
        content: "RN 강의 수강하기",
        date: dayjs(),
        isSuccess: true
    },
]

export const useTodoList = (selectedDate) => {
    const [todoList, setTodoList] = useState(defaultTodoList)
    const [input, setInput] = useState("")
    const addTodo = (todo) => {
        const length = todoList.length
        const lastID = length === 0 ? 0 : todoList[length - 1].id
        const newTodoList = [
            ...todoList, {
                id: lastID + 1,
                content: input,
                date: selectedDate,
                isSuccess: false
            }
        ]
        setTodoList(newTodoList)
    }

    const removeTodo = (todoID) => {
        const newTodoList = todoList.filter(todo => (todo.id !== todoID))
        setTodoList(newTodoList)
    }

    const toggleTodo = (todoID) => {
        const newTodoList = todoList.map(todo => {
            if (todo.id !== todoID) { return todo }
            return {
                ...todo,
                isSuccess: !todo.isSuccess
            }
        })
        setTodoList(newTodoList)
    }

    return {
        todoList,
        addTodo,
        removeTodo,
        toggleTodo,
        input,
        setInput
    }
}