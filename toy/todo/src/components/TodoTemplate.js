import React from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';

const TodoTemplateBlock = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  margin-top: 96px;
  width: 512px;
  height: 768px;
  background: #fff;
  flex-direction: column;
  border-radius: 16px;
`;

const TodoTemplate = ({children}) => {
    return (
        <TodoTemplateBlock>
            {children}
        </TodoTemplateBlock>
    );
};

export default TodoTemplate;