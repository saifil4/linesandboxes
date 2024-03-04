import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import App2 from './App2';
import Provider from './Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));


window.onbeforeunload = function () {
  return true;
};

root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
