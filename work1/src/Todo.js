import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const Todo = () => {
    const [list, setList] = useState([]);

    const fetchTodos = async () => {
        await axios.get(
            "https://pre-onboarding-selection-task.shop/todos",
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': "application/json"
                }
            }).then(response => {
                if (response.data) {
                    setList(response.data);
                };
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    useEffect(() => {
        fetchTodos();
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async () => {
        const input = document.getElementById('todo-input').value;
        await axios.post(
            "https://pre-onboarding-selection-task.shop/todos",
            {
                "todo": `${input}`
            },
            {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': "application/json"
                }
            }).then(response => {
                fetchTodos();
            })
            .catch(error => {
                alert(error.response.data.message);
            });

    }
    return (
        <div>
            <h1>Todolist</h1>
            <ul>
                {list.map(({ id, todo, isCompleted }) =>
                    <TodoItem key={id} id={id} todo={todo} isCompleted={isCompleted} fetchTodos={fetchTodos} />
                )}
            </ul>
            <p>
                <label>할 일</label><br />
                <input id="todo-input" type="text" />
                <button onClick={handleSubmit}>추가</button>
            </p>
        </div>
    );
};

export default Todo;