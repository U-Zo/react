import React from 'react';
import TodoHead from '../components/TodoHead';
import { useTodoState } from '../modules/TodoContext';

const TodoHeadContainer = () => {
    const todos = useTodoState();
    const tasks = todos.filter(todo => !todo.done);
    const today = new Date();
    const date = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const day = today.toLocaleDateString('ko-KR', { weekday: 'long' });

    return (
        <TodoHead date={date} day={day} tasks={tasks.length}/>
    );
};

export default TodoHeadContainer;