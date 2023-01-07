import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import TodoLayout from "../../layouts/TodoLayout";
import { ReminderStyle } from "./index.style";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box } from "@mui/material";
import axios from "axios";
import SuccessNotification from "../../../components/SuccessNotification";

const Reminder = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [addSuccess, setAddSuccess] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const token = JSON.parse(localStorage.getItem("todoapp_token"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // get current task
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/reminder/${params.id}`, config)
      .then(res => {
        const data = res.data.data.end;
        if (data) {
          const splitData = data.split(" ");
          setDate(splitData[0]);
          setTime(data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const dateInfo = !date
    ? "hi"
    : date.$y
    ? `${date.$y}-${date.$M + 1 < 10 ? "0" + (date.$M + 1) : date.$M + 1}-${
        date.$D < 10 ? "0" + date.$D : date.$D
      }`
    : date;
  const timeInfo = !time
    ? "hi"
    : time.$H
    ? `${time.$H < 10 ? "0" + time.$H : time.$H}:${
        time.$m < 10 ? "0" + time.$m : time.$m
      }:00`
    : time.split(" ")[1];
  const bodyParameters = {
    end: `${dateInfo} ${timeInfo}`,
  };

  // Add new reminder
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/reminder/${params.id}/update`,
        bodyParameters,
        config,
      )
      .then(res => {
        setAddSuccess(true);
        setTimeout(() => {
          navigate("/home");
        }, 1200);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <TodoLayout>
      <ReminderStyle onSubmit={e => handleSubmit(e)}>
        <div className='title'>Nhắc nhở</div>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <p>Ngày</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Chọn ngày'
              value={date}
              onChange={newValue => {
                setDate(newValue);
              }}
              renderInput={params => <TextField {...params} required />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <p>Giờ</p>
            <TimePicker
              label='Chọn giờ'
              value={time}
              ampm={false}
              onChange={newValue => {
                setTime(newValue);
              }}
              renderInput={params => <TextField {...params} required />}
            />
          </LocalizationProvider>
        </Box>

        <div className='Footer'>
          <Button type='submit'>Lưu</Button>
          <Button>
            <span onClick={() => navigate("/home")}>Thoát</span>
          </Button>
        </div>
      </ReminderStyle>
      {addSuccess ? (
        <SuccessNotification
          isOpen={addSuccess}
          textSuccess='Thêm nhắc nhở công việc thành công!'
        />
      ) : (
        ""
      )}
    </TodoLayout>
  );
};

export default Reminder;
