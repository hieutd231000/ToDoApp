import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

import HomePage from '../pages/HomePage'
import HomePage2 from '../pages/HomePage2'
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
    path: '/home2',
    element: <HomePage2 />,
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
