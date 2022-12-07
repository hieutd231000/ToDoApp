import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TodoListStyle } from './index.style'
import PostAddIcon from '@mui/icons-material/PostAdd'
import TodoTable from './TodoTable'

const TodoList = () => {
  const navigate = useNavigate()

  return (
    <TodoListStyle>
      <>
        <div className='Add'>
          <PostAddIcon onClick={() => navigate('/tasks/add-task')} />
        </div>
        <div className='TodoTable'>
          <TodoTable />
        </div>
      </>
    </TodoListStyle>
  )
}

export default TodoList
