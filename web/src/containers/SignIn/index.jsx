import React, { useRef, useState } from 'react'
import { SignInStyle } from './index.style'
import LogInLayout from '../layouts/LogInLayout'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import Button from '../../components/Button'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorText, setEmailErrorText] = useState('')

  const [passError, setPassError] = useState(false)
  const [passErrorText, setPassErrorText] = useState('')

  const handleEmail = e => {
    if (!e.target.value) {
      setEmailError(true)
      setEmailErrorText('Email is required')
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError(true)
      setEmailErrorText('Invalid email address')
    } else {
      setEmailError(false)
      setEmailErrorText(false)
      setEmail(e.target.value)
    }
  }

  const handlePassword = e => {
    if (!e.target.value) {
      setPassError(true)
      setPassErrorText('Password is required')
    } else if (e.target.value !== '' && e.target.value.length < 4) {
      setPassError(true)
      setPassErrorText('Least 4 characters')
    } else {
      setPassError(false)
      setPassErrorText('')
      setPassword(e.target.value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (emailError || passError) return false
    console.log({
      mail: email,
      pass: password,
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
        <div className='Bottom'>
          <Button type='submit'>ログインする</Button>
          <a href='/sign-up'>サインアップ</a>
        </div>
      </SignInStyle>
    </LogInLayout>
  )
}

export default SignIn
