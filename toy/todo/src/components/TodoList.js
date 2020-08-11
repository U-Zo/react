import React, {useState} from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = ({todos, onEdit}) => {
    return (
        <TodoListBlock>
            {todos.map(todo => (
                <TodoItem key={todo.id} id={todo.id} done={todo.done} text={todo.text} onEdit={onEdit}/>
            ))}
        </TodoListBlock>
    );
};

export default TodoList;