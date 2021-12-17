import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";  
import Login from './components/Login/Login';
import { Provider } from './context/userContext';
import BlogPost from './components/BlogPost/BlogPost';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import {ToastContainer} from 'react-toastify';
import {PathProvider} from './context/pathContext';

ReactDOM.render(
  <React.StrictMode>
    <PathProvider>
    <Provider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={'colored'}
    />
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/post/:id" element={<BlogPost />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    </PathProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
