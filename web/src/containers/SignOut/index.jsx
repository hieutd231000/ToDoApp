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
      .post('http://127.0.0.1:8000/api/logout', bodyParameters, config)
      .then(res => {
        if (res.data.code === 200) {
          navigate('/sign-in')
        }
      })
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
