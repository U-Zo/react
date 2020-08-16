import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoPage from './pages/TodoPage';

const GlobalStyle = createGlobalStyle`
  body {
    background: #d9dfe9;
  }
`;

const App = () => {
    return (
        <>
            <GlobalStyle/>
            <TodoPage/>
        </>
    );
};

export default App;