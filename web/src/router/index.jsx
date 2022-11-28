import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

import NotFoundPage from '../pages/NotFoundPage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
])
