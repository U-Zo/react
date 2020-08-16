import React from 'react';
import TodoHeadContainer from '../containers/TodoHeadContainer';
import TodoListContainer from '../containers/TodoListContainer';
import TodoCreateContainer from '../containers/TodoCreateContainer';
import TodoTemplate from '../components/TodoTemplate';
import { TodoProvider } from '../modules/TodoContext';

const TodoPage = () => {
    return (
        <>
            <TodoProvider>
                <TodoTemplate>
                    <TodoHeadContainer/>
                    <TodoListContainer/>
                    <TodoCreateContainer/>
                </TodoTemplate>
            </TodoProvider>
        </>
    );
};

export default TodoPage;