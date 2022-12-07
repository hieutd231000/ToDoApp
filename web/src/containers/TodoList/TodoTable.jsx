import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const columns = [
  { id: 'task_name', label: 'タスク', minWidth: 300, align: 'center' },
  { id: 'created_at', label: '作成期間', minWidth: 150, align: 'center' },
  { id: 'status', label: 'ステータス', minWidth: 150, align: 'center' },
  { id: 'action', label: '操作', minWidth: 200, align: 'center' },
]

const TodoTable = () => {
  const [data, setData] = useState()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // get data
  const token = JSON.parse(localStorage.getItem('todoapp_token'))
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const bodyParameters = {
    key: 'value',
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/todo', config)
      .then(res => {
        setData(res.data.data)
      })
      .catch(error => console.log(error))
  }, [])

  //delete
  const handleDelete = id => {
    setData(data.filter(elm => elm.id !== id))
    axios.post(
      `http://127.0.0.1:8000/api/todo/${id}/delete`,
      bodyParameters,
      config,
    )
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columns.map(column => {
                      const value =
                        column.id === 'action' ? (
                          <>
                            <NotificationsActiveOutlinedIcon
                              onClick={() =>
                                navigate(`/tasks/${row.id}/reminder-task`)
                              }
                            />
                            <EditOutlinedIcon
                              style={{ padding: '0 20px' }}
                              onClick={() =>
                                navigate(`/tasks/${row.id}/edit-task`)
                              }
                            />
                            <DeleteOutlineOutlinedIcon
                              onClick={e => {
                                handleDelete(row.id)
                              }}
                            />
                          </>
                        ) : (
                          row[column.id]
                        )
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TodoTable
