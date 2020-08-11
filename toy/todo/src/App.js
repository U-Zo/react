import React, {useRef, useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';

const GlobalStyle = createGlobalStyle`
  body {
    background: #d9dfe9;
  }
`;

const App = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '프로젝트 생성하기',
            done: true
        },
        {
            id: 2,
            text: '컴포넌트 스타일링하기',
            done: true
        },
        {
            id: 3,
            text: 'Context 만들기',
            done: false
        },
        {
            id: 4,
            text: '기능 구현하기',
            done: false
        }
    ]);

    let nextId = 5;

    const onInsert = (text) => {
        setTodos([
            ...todos,
            {
                id: nextId,
                text: text,
                done: false
            }
        ]);

        nextId++;
    };

    const onEdit = (id, text) => {
        let newTodos = [...todos];
        newTodos[id - 1] = {
            text
        };
        setTodos(newTodos);
    };

    return (
        <>
            <GlobalStyle/>
            <TodoTemplate>
                <TodoHead/>
                <TodoList todos={todos} onEdit={onEdit}/>
                <TodoCreate onInsert={onInsert}/>
            </TodoTemplate>
        </>
    );
}

export default App;