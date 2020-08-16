import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDelete, MdDone, MdEdit } from 'react-icons/md';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const iconStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;

const Edit = styled.div`
  ${iconStyle}
  &:hover {
    color: #6baeff;
  }
`;

const Remove = styled.div`
  ${iconStyle}
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const TodoItem = ({ id, done, text, onToggle, onRemove, onEditTodo }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState('');

    const onEdit = () => {
        setEdit(!edit);
    };

    const onSubmit = e => {
        e.preventDefault();
        onEditTodo(id, value);
        setEdit(!edit);
        setValue('');
    };

    const onChange = e => setValue(e.target.value);

    return (
        <TodoItemBlock>
            <CheckCircle onClick={() => onToggle(id)} done={done}>
                {done && <MdDone/>}
            </CheckCircle>
            {!edit ? <Text done={done}>{text}</Text> :
                <form onSubmit={onSubmit}>
                    <input
                        placeholder={text}
                        onChange={onChange}
                        value={value}
                        autoFocus
                    />
                </form>
            }
            <Edit onClick={onEdit}>
                <MdEdit/>
            </Edit>
            <Remove onClick={() => onRemove(id)}>
                <MdDelete/>
            </Remove>
        </TodoItemBlock>
    );
};

const TodoList = ({ todos, onToggle, onRemove, onEditTodo }) => {
    return (
        <TodoListBlock>
            {todos.map(todo => (
                <TodoItem key={todo.id} id={todo.id} done={todo.done}
                          text={todo.text} onRemove={onRemove} onEditTodo={onEditTodo} onToggle={onToggle}/>
            ))}
        </TodoListBlock>
    );
};

export default TodoList;