import axios from 'axios';

const HEADERS = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': "application/json"
};

export const signUp = async ({ email, password }) => {
    await axios.post(
        "https://pre-onboarding-selection-task.shop/auth/signup",
        {
            "email": email,
            "password": password
        })
        .then(response => {
            localStorage.setItem('token', response.data.access_token);
            alert('성공적으로 로그인 했습니다');
            return true;
        })
        .catch(error => {
            alert(error.response.data.message);
            return false;
        });
};

export const fetchTodos = async () =>
    await axios.get(
        "https://pre-onboarding-selection-task.shop/todos",
        { 'headers': HEADERS })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            alert(error.response.data.message);
            return null;
        });


export const addTodo = async (todo) =>
    await axios.post(
        "https://pre-onboarding-selection-task.shop/todos",
        { "todo": `${todo}` },
        { 'headers': HEADERS })
        .then(() => {
            fetchTodos();
        })
        .catch(error => {
            alert(error.response.data.message);
        });

export const updateTodo = async ({ id, todo, isCompleted }) =>
    await axios.put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
            ...(todo && { "todo": `${todo}` }),
            ...(isCompleted && { "isCompleted": isCompleted }),
        },
        { 'headers': HEADERS })
        .then(() => {
            fetchTodos();
        })
        .catch(error => {
            alert(error.response.data.message);
        });


export const deleteTodo = async (id) =>
    await axios.delete(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        { 'headers': HEADERS })
        .then(() => {
            fetchTodos();
        })
        .catch(error => {
            alert(error.response.data.message);
        });


