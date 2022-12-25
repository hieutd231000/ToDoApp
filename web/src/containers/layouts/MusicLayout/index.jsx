import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { HomeStyle } from '../../Home/index.style'
import SignOut from '../../SignOut'
import TodoList from '../../TodoList'
import CountDown from '../../Countdown'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export default function MusicLayout({ children }) {
  const [value, setValue] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <SignOut />
      <HomeStyle
        sx={{
          flexGrow: 1,
          display: 'flex',
        }}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{ borderRight: 1, borderColor: 'divider' }}>
          <Tab label='Danh sách công việc' {...a11yProps(0)} />
          <Tab label='Nghe nhạc' {...a11yProps(1)} />
          <Tab label='Countdown' {...a11yProps(2)} />
        </Tabs>
        <TabPanel className='TabPanel' value={value} index={0}>
          <TodoList />
        </TabPanel>
        <TabPanel className='TabPanel' value={value} index={1}>
          {children}
        </TabPanel>
        <TabPanel className='TabPanel' value={value} index={2}>
          <CountDown />
        </TabPanel>
      </HomeStyle>
    </>
  )
}
