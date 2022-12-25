import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Button from '../../components/Button'
import { MusicStyle } from './index.style'
import { Modal } from '@mui/material'
import YouTube from 'react-youtube'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { DeleteModalStyle } from '../TodoList/index.style'
import { useNavigate } from 'react-router-dom'

const Music = () => {
  const [musicType, setMusicType] = useState()
  const [listMusic, setListMusic] = useState()
  const [filterMusic, setFilterMusic] = useState()

  const [open, setOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)

  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('todoapp_token'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const bodyParameters = {
    key: 'value',
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/music`, config)
      .then(res => {
        setListMusic(res.data.data)
        setFilterMusic(res.data.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleMusicType = musicType => {
    switch (musicType) {
      case 0:
        return '全部'
      case 1:
        return 'ロフィ'
      case 2:
        return 'ポップス'
      case 3:
        return 'EDM'
      case 4:
        return 'ほかの'
      default:
        return
    }
  }

  const handleChangeType = event => {
    console.log(event.target.value)
    if (event.target.value === 0) {
      setFilterMusic(listMusic)
    } else {
      const newList = listMusic.filter(
        music => music.category === handleMusicType(event.target.value),
      )
      setFilterMusic(newList)
    }
  }

  // handle delete
  const handleDelete = id => {
    setListMusic(listMusic.filter(elm => elm.id != id))
    setFilterMusic(filterMusic.filter(elm => elm.id != id))
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/music/${id}/delete`,
        bodyParameters,
        config,
      )
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
  }

  const handleClose = () => {
    setOpen(false)
    setActiveModal(null)
  }
  const handleOpen = index => {
    setActiveModal(index)
  }

  console.log(filterMusic)
  return (
    <MusicStyle>
      <div className='Header'>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='music-type-label'>Music Type</InputLabel>
            <Select
              labelId='music-type-label'
              id='music'
              defaultValue={0}
              label='Thể loại nhạc'
              onChange={handleChangeType}>
              <MenuItem value={1}>Lofi</MenuItem>
              <MenuItem value={2}>Pop</MenuItem>
              <MenuItem value={3}>EDM</MenuItem>
              <MenuItem value={4}>Khác</MenuItem>
              <MenuItem value={0}>Toàn bộ</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button>
          <p onClick={() => navigate('/music/add-music')}>Thêm bài hát mới</p>
        </Button>
      </div>
      <Grid container spacing={2}>
        {filterMusic
          ? filterMusic.map(music => (
              <Grid item md={3} xs={4} key={music.id}>
                <div className='MusicCard'>
                  <div className='MusicCard__Header'>
                    <EditOutlinedIcon
                      onClick={() => navigate(`/music/${music.id}/edit-music`)}
                    />
                    <DeleteOutlineOutlinedIcon
                      onClick={e => {
                        handleOpen(music.id)
                      }}
                    />
                  </div>
                  <div className='MusicCard__Content'>
                    <YouTube
                      videoId={music.link.split('=')[1]}
                      sandbox='allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation'
                      onReady={e => e.target.pauseVideo()}
                    />
                  </div>
                  <div className='MusicCard__Footer'>
                    <p>{music.name}</p>
                    <p style={{ color: '#ccc' }}>{music.category}</p>
                  </div>
                </div>
                <Modal
                  open={activeModal === music.id}
                  onClose={() => setOpen(false)}>
                  <DeleteModalStyle>
                    <div className='title'>
                      Bạn có chắc muốn xóa bài hát này chứ ?
                    </div>
                    <div className='footer'>
                      <Button>
                        <p onClick={() => handleClose()}>Không</p>
                      </Button>
                      <Button>
                        <p
                          onClick={() => {
                            handleDelete(music.id)
                            handleClose()
                          }}>
                          Đồng ý
                        </p>
                      </Button>
                    </div>
                  </DeleteModalStyle>
                </Modal>
              </Grid>
            ))
          : ''}
      </Grid>
    </MusicStyle>
  )
}

export default Music
