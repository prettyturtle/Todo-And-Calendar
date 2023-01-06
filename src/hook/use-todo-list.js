import {useState} from "react";
import dayjs from "dayjs";

export const useTodoList = (selectedDate) => {
    const [todoList, setTodoList] = useState([])
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

    const resetInput = () => setInput("")

    const filteredTodoList = todoList.filter(todo => {
        const isSameDate = dayjs(todo.date).isSame(selectedDate, "date")
        return isSameDate
    })

    return {
        filteredTodoList,
        addTodo,
        removeTodo,
        toggleTodo,
        input,
        setInput,
        resetInput
    }
}