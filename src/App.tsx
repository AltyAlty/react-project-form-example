/*
yarn create react-app . --template typescript
yarn add react-hook-form
*/

import React from 'react';
import './App.css';
import {LoginForm} from './login-form';

function App() {
    return (
        <div className='App'>
            <LoginForm/>
        </div>
    );
}

export default App;
