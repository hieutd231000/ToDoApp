import React, { useState } from 'react'
import { SignInStyle } from './index.style'
import LogInLayout from '../layouts/LogInLayout'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import Loading from '../../components/Loading'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorText, setEmailErrorText] = useState('')

  const [passError, setPassError] = useState(false)
  const [passErrorText, setPassErrorText] = useState('')

  const [loginFail, setLoginFail] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleEmail = e => {
    if (!e.target.value) {
      setEmailError(true)
      setEmailErrorText('メールアドレス必須')
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError(true)
      setEmailErrorText('無効な電子メールアドレス')
    } else {
      setEmailError(false)
      setEmailErrorText('')
      setEmail(e.target.value)
    }
  }

  const handlePassword = e => {
    setLoginFail(false)
    if (!e.target.value) {
      setPassError(true)
      setPassErrorText('パスワード必須')
    } else if (e.target.value !== '' && e.target.value.length < 6) {
      setPassError(true)
      setPassErrorText('6 文字以上')
    } else {
      setPassError(false)
      setPassErrorText('')
      setPassword(e.target.value)
    }
  }

  let data = { email, password }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    if (emailError || passError) return false
    axios
      .post('http://127.0.0.1:8000/api/login', data)
      .then(res => {
        localStorage.setItem(
          'todoapp_token',
          JSON.stringify(res.data.data.token),
        )
        navigate('/home')
      })
      .catch(err => {
        setLoginFail(true)
        setLoading(false)
      })
  }

  return (
    <LogInLayout>
      <SignInStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon
            sx={{ fontSize: 32, color: 'action.active', mr: 1, my: 0.5 }}
          />
          <TextField
            error={emailError}
            id='email'
            label='メール'
            variant='standard'
            helperText={emailErrorText}
            onChange={e => handleEmail(e)}
            required
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LockPersonIcon
            sx={{ fontSize: 32, color: 'action.active', mr: 1, my: 0.5 }}
          />
          <TextField
            id='password'
            label='パスワード'
            type='password'
            variant='standard'
            error={passError}
            helperText={passErrorText}
            onChange={e => handlePassword(e)}
            required
          />
        </Box>

        {loginFail ? (
          <span className='LogInFail'>
            メールアドレスまたはパスワードが正しくない
          </span>
        ) : (
          ''
        )}
        <div className='Bottom'>
          <Button type='submit'>ログインする</Button>
          <p onClick={() => navigate('/sign-up')}>サインアップ</p>
        </div>
        {loading ? <Loading /> : ''}
      </SignInStyle>
    </LogInLayout>
  )
}

export default SignIn
