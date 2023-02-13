import React, { useEffect, useMemo, useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NotificationStyle } from "./index.style";
import axios from "axios";
import NotificationElm from "./NotificationElm";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notice, setNotice] = useState(0);
  const [data, setData] = useState();

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    localStorage.removeItem("data_notice");
    setAnchorEl(null);
  };

  // get data
  const token = JSON.parse(localStorage.getItem("todoapp_token"));
  const data_notice = localStorage.getItem("data_notice")
    ? JSON.parse(localStorage.getItem("data_notice"))
    : [];
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/todo`, config)
      .then(res => {
        setData(res.data.data);
        if (data_notice) {
          setNotice(data_notice.length);
        }
      })
      .catch(error => console.log(error));
  }, []);

  // handle notice
  const handleResetNotice = () => {
    setNotice(0);
  };

  // format date
  const formatCreatedDate = str => {
    const arr = str.split("-");
    return `${arr[2]}/${arr[1]}/${arr[0]}`;
  };

  const formatUpdatedDate = str => {
    const arr = str.split(" ");
    const arr1 = arr[0].split("-");
    return `${arr1[2]}/${arr1[1]}/${arr1[0]}`;
  };

  let listNotification = [];
  const handleList = data => {
    let createList = [];
    let updateList = [];
    if (data) {
      for (const dt of data) {
        createList.push({
          type: "create",
          task_name: dt.task_name,
          status: dt.status,
          time: formatCreatedDate(dt.created_at),
        });
        updateList.push({
          type: "update",
          task_name: dt.task_name,
          status: dt.status,
          time: formatUpdatedDate(dt.updated_at),
        });
      }
    }
    listNotification = [...createList, ...updateList, ...data_notice];
    return listNotification.sort((a, b) => new Date(b.time) - new Date(a.time));
  };
  handleList(data);

  return (
    <NotificationStyle>
      <Button
        id='basic-button'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <Badge badgeContent={notice} color='primary'>
          <NotificationsNoneOutlinedIcon
            className={notice > 0 ? "notice-icon animation" : "notice-icon"}
            color='action'
            onClick={() => handleResetNotice()}
          />
        </Badge>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: "40ch",
          },
        }}>
        {listNotification &&
          listNotification.map((elm, index) => (
            <MenuItem key={index}>
              <NotificationElm data={elm} />
            </MenuItem>
          ))}
      </Menu>
    </NotificationStyle>
  );
};

export default Notification;
