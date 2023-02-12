import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoListStyle } from "./index.style";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Tour from "reactour";

import TodoTable from "./TodoTable";
import Notification from "./Notification";

const TaskTourConfig = [
  {
    selector: '[data-tut="table"]',
    content: "Đây là bảng trạng thái danh sách công việc, cũng phần trọng tâm.",
  },
  {
    selector: '[data-tut="add-task"]',
    content: "Chúng ta có thể thêm công việc mới",
  },
  {
    selector: '[data-tut="delete-task"]',
    content: "Xóa từng công việc",
  },
  {
    selector: '[data-tut="edit-task"]',
    content: "Sửa công việc",
  },
  {
    selector: '[data-tut="notice-task"]',
    content: "Thông báo cho công việc khi đến hạn",
  },
  {
    selector: '[data-tut="delete-multi-task"]',
    content: "Xóa nhiều công việc",
  },
  {
    selector: '[data-tut="sort-task"]',
    content: "Sắp xếp công việc",
  },
  {
    selector: '[data-tut="filter-task"]',
    content: "Lọc danh sách công việc theo trạng thái",
  },
  {
    selector: '[data-tut="notification-task"]',
    content: "Thông báo khi thay đổi công việc",
  },
];

const TodoList = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const navigate = useNavigate();

  const closeTour = () => {
    setIsTourOpen(false);
  };

  const openTour = () => {
    setIsTourOpen(true);
  };

  return (
    <TodoListStyle>
      <div className='Add'>
        <PostAddIcon
          onClick={() => navigate("/tasks/add-task")}
          data-tut='add-task'
        />
        <Notification data-tut='notification-task' />
        <TipsAndUpdatesIcon onClick={() => openTour()} />
      </div>

      <Tour
        onRequestClose={closeTour}
        steps={TaskTourConfig}
        isOpen={isTourOpen}
        rounded={5}
        accentColor='#1976d2'
      />

      <div className='TodoTable'>
        <TodoTable />
      </div>
    </TodoListStyle>
  );
};

export default TodoList;
