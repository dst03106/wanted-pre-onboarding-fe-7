import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TodoItem = ({ id, todo, isCompleted, fetchTodos }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(todo);

    const handleInputChange = (value) => {
        setInputValue(value);
    };
    const handleEditButtonClick = () => {
        setIsEditable(true);
    };
    const handleCancleButtonClick = () => {
        setIsEditable(false);
    };

    const handleTodoUpdate = async ({ newTodo, newIsCompleted }) => {

        await axios.put(
            `https://pre-onboarding-selection-task.shop/todos/${id}`,
            {
                "todo": `${newTodo ? newTodo : todo}`,
                "isCompleted": newIsCompleted ?? isCompleted,
            },
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': "application/json"
                }
            }
        ).then(() => {
            setIsEditable(false);
            fetchTodos();
        }).catch(error => {
            alert(error.response.data.message);
        });
    };

    const handleListItemDelete = async (id) => {
        await axios.delete(
            `https://pre-onboarding-selection-task.shop/todos/${id}`,
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': "application/json"
                }
            }
        ).then(() => {
            fetchTodos();
        }).catch(error => {
            alert(error.response.data.message);
        });
    };
    return (
        <>
            <li key={id}>
                {
                    isEditable ? (
                        <div>
                            <input value={inputValue} onChange={({ target: { value } }) => handleInputChange(value)} />
                            <button onClick={() => handleTodoUpdate({ newTodo: inputValue })}>제출</button>
                            <button onClick={handleCancleButtonClick}>취소</button>
                        </div>
                    ) : (
                        <div>
                            <input type="checkbox" checked={isCompleted} onClick={() => handleTodoUpdate({ newIsCompleted: !isCompleted })} />{todo}
                            <button onClick={handleEditButtonClick}>수정</button>
                            <button onClick={() => handleListItemDelete(id)}>삭제</button>
                        </div>
                    )
                }
            </li>
        </>
    );
};

export default TodoItem;