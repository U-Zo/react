// API 함수화 및 분리
import axios from 'axios';

export const getPost = id =>
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = id =>
    axios.get(`https://jsonplaceholder.typicode.com/users`);