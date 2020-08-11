import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/todo/TodoTemplate';

const GlobalStyle = createGlobalStyle`
  body {
    background: #d9dfe9;
  }
`;

const App = () => {
    return (
        <>
            <GlobalStyle/>
            <TodoTemplate/>
        </>
    );
}

export default App;