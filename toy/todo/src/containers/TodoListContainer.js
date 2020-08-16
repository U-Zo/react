import React from 'react';
import TodoList from '../components/TodoList';
import { useTodoDispatch, useTodoState } from '../modules/TodoContext';

const TodoListContainer = () => {
    const todos = useTodoState();
    const dispatch = useTodoDispatch();

    const onEditTodo = (id, value) => {
        dispatch({
            type: "EDIT",
            id,
            value
        });
    };

    const onToggle = id => {
        dispatch({
            type: 'TOGGLE',
            id
        });
    };

    const onRemove = id => {
        dispatch({
            type: 'REMOVE',
            id
        });
    };


    return (
        <TodoList todos={todos} onToggle={onToggle} onEditTodo={onEditTodo} onRemove={onRemove}/>
    );
};

export default TodoListContainer;