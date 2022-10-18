import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { updateTodo, deleteTodo } from '../apis';
import Todos from '../containers/Todos';

const TodoItem = ({ id, todo, isCompleted, setTodos }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [todoItem, setTodoItem] = useState({
        todo,
        isCompleted,
    });

    const handleInputChange = ({ name, value }) => {
        setTodoItem({
            ...todoItem,
            [name]: value
        });
    };

    const handleEditModeToggle = () => {
        setIsEditable(prev => !prev);
    };

    const handleTodoUpdate = async ({ id, todo, isCompleted }) => {
        await updateTodo({ id, todo, isCompleted });
        handleEditModeToggle();
        setTodos((todos) => {
            return todos.map(todoItem => {
                if (todoItem.id === id) {
                    return {
                        ...todoItem,
                        todo,
                        isCompleted
                    }
                }
                return todoItem
            });
        });
    }

    const handleListItemDelete = async (id) => {
        await deleteTodo(id);
        setTodos((todos) => {
            return todos.filter(todo => todo.id !== id);
        });
    };


    return (
        <>
            <li key={id}>
                {
                    isEditable ? (
                        <div>
                            <input
                                name="todo"
                                value={todoItem.todo}
                                onChange={({ target: { name, value } }) => handleInputChange({ name, value })}
                            />
                            <button onClick={() => handleTodoUpdate({ id, todo: todoItem.todo, isCompleted: todoItem.isCompleted })}>제출</button>
                            <button onClick={handleEditModeToggle}>취소</button>
                        </div>
                    ) : (
                        <div>
                            <input
                                name="isCompleted"
                                type="checkbox"
                                checked={todoItem.isCompleted}
                                onChange={({ target: { name, checked } }) => handleInputChange({ name, checked })}
                                onClick={() => handleTodoUpdate({ id, todo: todoItem.todo, isCompleted: !todoItem.isCompleted })}
                            />{todo}
                            <button onClick={handleEditModeToggle}>수정</button>
                            <button onClick={() => handleListItemDelete(id)}>삭제</button>
                        </div>
                    )
                }
            </li>
        </>
    );
};

export default TodoItem;