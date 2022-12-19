import React from 'react'
import axios from 'axios'
import { SignOutStyle } from './index.style'

import { useNavigate } from 'react-router-dom'

const SignOut = () => {
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('todoapp_token'))

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const bodyParameters = {
    key: 'value',
  }

  const handleLogout = e => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/logout`, bodyParameters, config)
      .then(response => {
        localStorage.removeItem('todoapp_token')
        navigate('/sign-in')
      })
      .catch(error => console.log(error))
  }

  return (
    <SignOutStyle>
      <div className='Bottom'>
        <p onClick={e => handleLogout(e)}>サインアウト</p>
      </div>
    </SignOutStyle>
  )
}

export default SignOut
