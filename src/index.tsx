/*
Создание шаблона проекта: yarn create react-app . --template typescript
Установка react-hook-form: yarn add react-hook-form
Установка GitHub Pages: yarn add gh-pages --dev

Установка всех модулей (если необходимо): yarn install
Запуск приложения: yarn start
Собрать билд для GitHub Pages: yarn build
Развернуть билд на GitHub Pages: gh-pages -d build
*/

/*Статья по формам: https://evilmartians.com/chronicles/html-best-practices-for-login-and-signup-forms
Курс по формам на web.dev: https://web.dev/learn/forms/
Атрибут "htmlFor" в React является аналогом атрибута "for".*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();