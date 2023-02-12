import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "../../../components/Button";
import TodoLayout from "../../layouts/TodoLayout";
import { AddTaskStyle } from "./index.style";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import Loading from "../../../components/Loading";
import { useEffect } from "react";
import SuccessNotification from "../../../components/SuccessNotification";

const AddEditTask = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [titleErrorText, setTitleErrorText] = useState("");

  const [loading, setLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const token = JSON.parse(localStorage.getItem("todoapp_token"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParameters = {
    title,
    status,
  };

  // convert string status to number
  const convertStatus = status => {
    var num = -1;
    switch (status) {
      case "対応しない":
        return (num = 0);
      case "未対応":
        return (num = 1);
      case "対応中":
        return (num = 2);
      case "完了":
        return (num = 3);
      default:
        return num;
    }
  };

  // get current task
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/todo/${params.id}/getTask`,
        config,
      )
      .then(res => {
        setTitle(res.data.data.title);
        setStatus(convertStatus(res.data.data.status));
      })
      .catch(error => console.log(error));
  }, []);

  // handle Title
  const handleTitle = e => {
    setTitle(e.target.value);
    if (e.target.value !== "") {
      setTitleError(false);
      setTitleErrorText("");
      setTitle(e.target.value);
    } else {
      setTitleError(true);
      setTitleErrorText("Yêu cầu nhập công việc !");
    }
  };

  // format current date
  const formatCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month}-${day}`;
  };

  // handle localstorage data
  const handleLocalstorageData = type => {
    if (!localData) {
      localStorage.setItem(
        "data_notice",
        JSON.stringify([
          {
            type: type,
            task_name: bodyParameters.title,
            status: bodyParameters.status,
            time: formatCurrentDate(),
          },
        ]),
      );
    } else {
      localData.push({
        type: type,
        task_name: bodyParameters.title,
        status: bodyParameters.status,
        time: formatCurrentDate(),
      });
      localStorage.setItem("data_notice", JSON.stringify(localData));
    }
  };

  const localData = JSON.parse(localStorage.getItem("data_notice"));
  // submit task
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (params.id) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/todo/${params.id}/update`,
          bodyParameters,
          config,
        )
        .then(res => {
          setLoading(false);
          setEditSuccess(true);
          handleLocalstorageData("update");
          setTimeout(() => {
            navigate("/home");
          }, 1300);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/todo/add`,
          bodyParameters,
          config,
        )
        .then(res => {
          setLoading(false);
          setAddSuccess(true);
          handleLocalstorageData("create");
          setTimeout(() => {
            navigate("/home");
          }, 1300);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <TodoLayout>
      <AddTaskStyle onSubmit={e => handleSubmit(e)}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <p>Công việc</p>
          <TextField
            id='title'
            error={titleError}
            helperText={titleErrorText}
            label='Nhập công việc'
            variant='outlined'
            value={title ? title : ""}
            onChange={e => handleTitle(e)}
            required
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <p>Trạng thái</p>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Lựa chọn trạng thái
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='status'
              value={status}
              label='Lựa chọn trạng thái'
              onChange={e => setStatus(e.target.value)}
              required>
              <MenuItem value={0}>Không hoàn thành</MenuItem>
              <MenuItem value={1}>Quá hạn</MenuItem>
              <MenuItem value={2}>Đang thực hiện</MenuItem>
              <MenuItem value={3}>Hoàn thành</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className='Footer'>
          <Button type='submit'>Lưu</Button>
          <Button>
            <p onClick={() => navigate("/home")}>Thoát</p>
          </Button>
        </div>
        {loading ? <Loading /> : ""}
        {addSuccess ? (
          <SuccessNotification
            isOpen={addSuccess}
            textSuccess='Thêm nhiệm vụ thành công!'
          />
        ) : (
          ""
        )}
        {editSuccess ? (
          <SuccessNotification
            isOpen={editSuccess}
            textSuccess='Chỉnh sửa nhiệm vụ thành công!'
          />
        ) : (
          ""
        )}
      </AddTaskStyle>
    </TodoLayout>
  );
};

export default AddEditTask;
