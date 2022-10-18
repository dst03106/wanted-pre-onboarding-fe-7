import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchTodos, addTodo } from '../apis';
import TodoItem from '../components/TodoItem';

const Todos = () => {
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (value) => {
        setInputValue(value);
    }

    const handleSubmit = () => {
        addTodo(inputValue);
        setTodos((todos) => {
            return [...todos, { id: todos[todos.length - 1].id + 1, todo: inputValue, isCompleted: false }]
        })
    }

    useEffect(() => {
        (async () => {
            const data = await fetchTodos();
            if (data) setTodos(data);
        })();

        if (!localStorage.getItem('token')) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <h1>Todolist</h1>
            <ul>
                {todos.map(({ id, todo, isCompleted }) =>
                    <TodoItem
                        key={id}
                        id={id}
                        todo={todo}
                        isCompleted={isCompleted}
                        setTodos={setTodos}
                    />
                )}
            </ul>
            <div>
                <label>할 일</label>
                <br />
                <input type="text" value={inputValue} onChange={({ target: { value } }) => handleChange(value)} />
                <button onClick={({ target: { value } }) => handleSubmit(value)}>추가</button>
            </div>
        </>
    );
};

export default Todos;