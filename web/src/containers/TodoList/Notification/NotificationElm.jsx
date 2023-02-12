import React from "react";
import { NotificationElmStyle } from "./index.style";

import Avatar from "@mui/material/Avatar";
import ErrorIcon from "@mui/icons-material/Error";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const NotificationElm = ({ data }) => {
  const handleTaskType = taskStatus => {
    if (taskStatus)
      switch (taskStatus) {
        case 0:
        case "対応しない":
          return (
            <Avatar style={{ backgroundColor: "yellow" }}>
              <ErrorIcon />
            </Avatar>
          );
        case 1:
        case "未対応":
          return (
            <Avatar style={{ backgroundColor: "red" }}>
              <EventBusyIcon />
            </Avatar>
          );
        case 2:
        case "対応中":
          return (
            <Avatar style={{ backgroundColor: "blue" }}>
              <ManageAccountsIcon />
            </Avatar>
          );
        case 3:
        case "完了":
          return (
            <Avatar style={{ backgroundColor: "green" }}>
              <CheckCircleIcon />
            </Avatar>
          );
        default:
          return;
      }
  };

  return (
    <NotificationElmStyle>
      {handleTaskType(data.status)}
      {data.type === "create" ? (
        <div>
          Bạn đã tạo task &nbsp;
          <span className='TaskName'>{data.task_name}</span>
          <h5>Thời gian tạo: {data.time}</h5>
        </div>
      ) : (
        <div>
          Bạn đã sửa task
          <span className='TaskName'>{data.task_name}</span>
          <h5>Thời gian sửa: {data.time}</h5>
        </div>
      )}
    </NotificationElmStyle>
  );
};

export default NotificationElm;
