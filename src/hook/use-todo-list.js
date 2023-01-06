import {useEffect, useState} from "react";
import dayjs from "dayjs";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO_LIST_KEY = "TODO_LIST_KEY"

export const useTodoList = (selectedDate) => {
    const [todoList, setTodoList] = useState([])
    const [input, setInput] = useState("")

    const saveTodoList = (newTodoList) => {
        setTodoList(newTodoList)
        const newTodoListString = JSON.stringify(newTodoList)

        AsyncStorage.setItem(TODO_LIST_KEY, newTodoListString)
    }

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
        saveTodoList(newTodoList)
    }

    const removeTodo = (todoID) => {
        const newTodoList = todoList.filter(todo => (todo.id !== todoID))
        saveTodoList(newTodoList)
    }

    const toggleTodo = (todoID) => {
        const newTodoList = todoList.map(todo => {
            if (todo.id !== todoID) { return todo }
            return {
                ...todo,
                isSuccess: !todo.isSuccess
            }
        })
        saveTodoList(newTodoList)
    }

    const resetInput = () => setInput("")

    const filteredTodoList = todoList.filter(todo => {
        const isSameDate = dayjs(todo.date).isSame(selectedDate, "date")
        return isSameDate
    })

    const init = async () => {
        const newTodoListString = await AsyncStorage.getItem(TODO_LIST_KEY)
        const newTodoList = JSON.parse(newTodoListString)
        setTodoList(newTodoList)
    }

    useEffect(() => {
        init()
    }, [])

    return {
        todoList,
        filteredTodoList,
        addTodo,
        removeTodo,
        toggleTodo,
        input,
        setInput,
        resetInput
    }
}