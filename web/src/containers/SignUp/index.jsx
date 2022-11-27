import React from 'react'
import { SignUpStyle } from './index.style'
import TextField from '@mui/material/TextField'

const SignUp = () => {
  return (
    <SignUpStyle>
      <div className='UserName'>User Name: </div> &nbsp;
      <TextField id='outlined-basic' label='Username' variant='outlined' />
    </SignUpStyle>
  )
}

export default SignUp
