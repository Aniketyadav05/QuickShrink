import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import RedirectLink from './pages/RedirectLink'
import Link from './pages/Link'
import Auth from './pages/Auth'
import UrlProvider from './Context'


const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/link/:id',
        element:<Link/>
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      }
    ]
    
  }
])
const App = () => {
  return (
    <UrlProvider>
    <RouterProvider router={router}/>
    </UrlProvider>
  )
}

export default App