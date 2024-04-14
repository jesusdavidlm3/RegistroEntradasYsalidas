import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root'
import Check from './routes/Check'
import Register from './routes/Register'
import ErrorPage from './routes/ErrorPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../style.scss'

const router = createBrowserRouter([{
  path: '/',
  element: <Root/>,
  errorElement: <ErrorPage />,
  children: [{
    path: '/Check',
    element: <Check/>
  },{
    path: '/Register',
    element: <Register/>
  }]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
