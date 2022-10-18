import axios from 'axios';
import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../apis';

const TodoItem = ({ id, todo, isCompleted }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(todo);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleEditModeToggle = () => {
        setIsEditable(prev => !prev);
    };

    const handleTodoUpdate = async ({ id, todo, isCompleted }) => {
        await updateTodo({ id, todo, isCompleted });
        handleEditModeToggle();
    }

    const handleListItemDelete = async (id) => {
        await deleteTodo(id);
    };

    return (
        <>
            <li key={id}>
                {
                    isEditable ? (
                        <div>
                            <input value={inputValue} onChange={({ target: { value } }) => handleInputChange(value)} />
                            <button onClick={() => handleTodoUpdate({ todo: inputValue })}>제출</button>
                            <button onClick={handleEditModeToggle}>취소</button>
                        </div>
                    ) : (
                        <div>
                            <input type="checkbox" checked={isCompleted} onClick={() => handleTodoUpdate({ isCompleted: !isCompleted })} />{todo}
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