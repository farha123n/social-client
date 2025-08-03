import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router";
import Root from './Root.jsx';
import Home from './Pages/Home.jsx';
import Login from './Auth/Login.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Register from './Auth/Register.jsx';
import AddPost from './Pages/Addpost.jsx';
import PrivateRoute from './Provider/PrivateRoute.jsx';
import MyProfile from './Pages/MyProfile.jsx';
const router = createBrowserRouter([
  { path: "/", Component: Root,
    children:[
      {index:true,Component:Home},
      {path:'/login',Component:Login},
      {path:'/register',Component:Register},
      {path:'/addPost',element:  <PrivateRoute><AddPost></AddPost></PrivateRoute>},
      {path:'/myProfile',element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>}
    ]
   },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

        <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
