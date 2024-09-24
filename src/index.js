import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

const defaultState = {
  token: '',
  username: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, token: action.payload.token, username: action.payload.username }
    case 'kill':
      return { ...state, token: '', username: '' }
    default:
      return state
  }
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

