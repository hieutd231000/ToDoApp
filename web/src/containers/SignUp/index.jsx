import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SignUpStyle } from './index.style'
import LogInLayout from '../layouts/LogInLayout'

import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import Button from '../../components/Button'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorText, setEmailErrorText] = useState('')

  const [passError, setPassError] = useState(false)
  const [passErrorText, setPassErrorText] = useState('')

  const [confirmError, setConfirmError] = useState(false)
  const [confirmErrorText, setConfirmErrorText] = useState('')

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
      setEmailErrorText(false)
      setEmail(e.target.value)
    }
  }

  const handlePassword = e => {
    if (!e.target.value) {
      setPassError(true)
      setPassErrorText('パスワード必須')
    } else if (e.target.value !== '' && e.target.value.length < 6) {
      setPassError(true)
      setPassErrorText('6 文字以上')
    } else if (confirm && e.target.value !== '' && e.target.value !== confirm) {
      setConfirmError(true)
      setConfirmErrorText('確認 パスワードが一致しません!')
    } else {
      setPassError(false)
      setPassErrorText('')
      setPassword(e.target.value)

      setConfirmError(false)
      setConfirmErrorText('')
    }
  }

  const handleConfirmPassword = e => {
    if (!e.target.value) {
      setConfirmError(true)
      setConfirmErrorText('Confirm Password is required')
    } else if (e.target.value !== '' && e.target.value !== password) {
      setConfirmError(true)
      setConfirmErrorText('Confirm Password is not match!')
    } else {
      setConfirmError(false)
      setConfirmErrorText('')
      setConfirm(e.target.value)
    }
  }

  let data = {
    name: username,
    email: email,
    password: password,
    c_password: confirm,
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (emailError || passError || confirmError) return false
    axios.post('http://127.0.0.1:8000/api/signup', data).then(res => {
      console.log(res)
      console.log(res.data)
    })
    navigate('/sign-in')
  }

  return (
    <LogInLayout>
      <SignUpStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PersonIcon
            sx={{ fontSize: 32, color: 'action.active', mr: 1, my: 0.5 }}
          />
          <TextField
            id='username'
            label='名前'
            variant='standard'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </Box>
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
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LockPersonIcon
            sx={{ fontSize: 32, color: 'action.active', mr: 1, my: 0.5 }}
          />
          <TextField
            id='confirm-password'
            label='確認パスワード'
            type='password'
            variant='standard'
            error={confirmError}
            helperText={confirmErrorText}
            onChange={e => handleConfirmPassword(e)}
            required
          />
        </Box>
        <div className='Bottom'>
          <Button type='submit'>サインアップ</Button>
          <p onClick={() => navigate('/sign-in')}>ログインする</p>
        </div>
      </SignUpStyle>
    </LogInLayout>
  )
}

export default SignUp
