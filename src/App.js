import React from 'react';
import './App.css';
import Router from './config/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index'
import { Provider } from 'react-redux'


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Q-App</h1>
      </header>
      <Provider store={store}>
      <main>
        <Router />
      </main>
      </Provider>
      <footer>
        <h3>Footer</h3>
      </footer>
    </div>
   
  );
}

export default App;
