import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import MainPage from './Pages/MainPage'
import LoginPage from './Pages/LogPage'
import RegPage from './Pages/RegPage'
import VerifyPage from './Pages/VerPage'
import DashboardMain from './Pages/Dashboard/DashboardMain'
import { store } from './store/store'
import { Provider } from 'react-redux'
import PassPage  from './Pages/PassPage'
import Profile from './Pages/Dashboard/DashboardProfile'
import ChatPage from './Pages/Dashboard/DashChat'


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
    path: '/password',
    element: <PassPage />,
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard/',
        element: <DashboardMain />,
      },
      {
        path: '/dashboard/chat/:id',
        element: <ChatPage />,
      },
      {
        path: '/dashboard/profile',
        element: <Profile />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)