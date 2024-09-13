import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import MainPage from './Pages/MainPage'
import LoginPage from './Pages/LoginPage'
import RegPage from './Pages/RegPage'
import VerifyPage from './Pages/VerifyPage'
import DashboardMain from './Pages/Dashboard/DashboardMain'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegPage />,
  },
  {
    path: '/verify',
    element: <VerifyPage />,
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard/',
        element: <DashboardMain />,
      },
      {
        path: '/dashboard/profile',
        element: <div>Profile</div>,
      },
      {
        path: '/dashboard/chat/:id',
        element: <div>Chat</div>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)