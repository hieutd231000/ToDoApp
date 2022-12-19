import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import NotFoundPage from '../pages/NotFoundPage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

import HomePage from '../pages/HomePage'
import AddEditTask from '../containers/TodoList/AddEditTask'
import Reminder from '../containers/TodoList/Reminder'
import Countdown from '../containers/Countdown'
import AddEditMusic from '../containers/Music/AddEditMusic'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <SignInPage />,
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
  {
    path: '/tasks/add-task',
    element: <AddEditTask />,
  },
  {
    path: '/tasks/:id/edit-task',
    element: <AddEditTask />,
  },
  {
    path: '/tasks/:id/reminder-task',
    element: <Reminder />,
  },
  {
    path: '/music/add-music',
    element: <AddEditMusic />,
  },
  {
    path: '/music/:id/edit-music',
    element: <AddEditMusic />,
  },
  {
    path: '/tasks/countdown',
    element: <Countdown />,
  },
])
