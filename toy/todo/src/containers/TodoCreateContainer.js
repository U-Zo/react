import React from 'react';
import TodoCreate from '../components/TodoCreate';
import { useTodoDispatch, useTodoNextId } from '../modules/TodoContext';

const TodoCreateContainer = () => {
    const nextId = useTodoNextId();
    const dispatch = useTodoDispatch();

    const onCreate = (value) => {
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false
            }
        });

        nextId.current++;
    };

    return (
        <TodoCreate onCreate={onCreate}/>
    );
};

export default TodoCreateContainer;