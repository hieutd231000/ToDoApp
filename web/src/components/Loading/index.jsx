import React from 'react'
import { CircularProgress } from '@mui/material'
import { LoadingStyle } from './index.style'

const Loading = () => {
  return (
    <LoadingStyle>
      <CircularProgress disableShrink />
    </LoadingStyle>
  )
}

export default Loading
