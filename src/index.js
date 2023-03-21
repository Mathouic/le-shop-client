import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './error-page';
import Home from './Workspaces/Home/home.jsx';
import CreateProfilForm, {action as profilFormAction} from './Workspaces/ProfilForm/create-profil-form';
import React from 'react';
import UpdateDeleteProfilForm from './Workspaces/ProfilForm/update-delete-profil-form';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    
    children: [{
      path: "home",
      element: <Home/>
    }, {
      path: "signin",
      element: <CreateProfilForm/>,
      action: profilFormAction
    }, {
      path: "profil/:mail",
      element: <UpdateDeleteProfilForm/>,
      //action: profilFormaction
    }]
  },
  
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
